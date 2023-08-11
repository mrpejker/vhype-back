/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import Loader from '../../components/loader';
import Modal from '../../components/modal';
import ErrorCreateMessage from './error-create';
import EventForm from './event-form';
import { utils } from 'near-api-js';
import { hash, resizeFile, uploadImageToIPFS } from '../../utils';
import { CollectionFormData, Quest } from '../../models/Event';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { logFirebaseAnalyticsEvent, setFirestoreDocumentData } from '../../utils/firebase';
import { AnalyticsEvents } from '../../constants/analytics-events';

const BOATLOAD_OF_GAS = utils.format.parseNearAmount('0.00000000003')!;

const CreateNewEvent: React.FC = () => {
  const { selector, accountId } = useWalletSelector();

  const [eventId, setEventId] = useState<number | null>(null);
  const [event_data, setEvenData] = useState<CollectionFormData | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isTransferable, setIsTransferable] = useState<boolean>(false);
  const [isLimited, setIsLimited] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [claimStrings, setClaimStrings] = useState<string[]>([]);

  const toggleEventPrivateSettings = (switchIndex: number) => {
    switch (switchIndex) {
      case 0:
        setIsPrivate(!isPrivate);
        break;

      case 1:
        setIsTransferable(!isTransferable);
        break;

      case 2:
        setIsLimited(!isLimited);
        break;

      default:
        return;
    }
  };
  // Uploading Images to IPFS and Start New Event after success
  const createNewEvent = async (eventData: CollectionFormData) => {
    try {
      setIsLoading(true);
      setEvenData({
        ...eventData,
      });
      // Resize Images Before Upload
      const { event_description, event_name, finish_time, start_time, quests, files } = eventData;
      const resizedImgsPromises = files.map(resizeFile);
      const resizedFiles = await Promise.all(resizedImgsPromises);

      // Upload Images To IPFS And Getiing Download URLS
      const promises = resizedFiles.map(uploadImageToIPFS);
      const cids = await Promise.all(promises);

      // Placing CIDs of Images to Request
      const strings: string[] = [];
      const questsWithUrls = quests
        .map((quest: Quest, index: number) => {
          if (cids[index] === undefined) return;
          // Setting URLS of Uploaded Images To Quests
          strings.push(quest.qr_prefix);
          // TODO: refactor
          // const hashedPrefix = hash(quest.qr_prefix);
          const prefixLength = quest.qr_prefix.length;
          return {
            ...quest,
            qr_prefix: quest.qr_prefix,
            qr_prefix_len: prefixLength,
            reward_uri: cids[index],
          };
        })
        .filter(Boolean);

      // Starting New Event In NEAR
      const wallet = await selector.wallet();

      const result: any = await wallet
        .signAndSendTransaction({
          signerId: accountId!,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'start_event',
                args: {
                  event_data: {
                    event_description,
                    event_name,
                    finish_time,
                    start_time,
                    quests: questsWithUrls,
                  },
                  collection_settings: {
                    signin_request: isPrivate,
                    transferability: isTransferable,
                    limited_collection: isLimited,
                  },
                },
                gas: BOATLOAD_OF_GAS,
                deposit: utils.format.parseNearAmount('0')!,
              },
            },
          ],
        })
        .catch((err: Error) => {
          throw err;
        });
      // TODO: Need to refactor this.
      const event_id = result.receipts_outcome[0].outcome.logs[0].split(' ')[8];
      setFirestoreDocumentData('claims', String(event_id), {
        claimStrings: strings,
        isPrivate: Boolean(isPrivate),
      });
      logFirebaseAnalyticsEvent(AnalyticsEvents.NEW_EVENT_CREATED, {});

      setClaimStrings(strings);
      setEventId(Number(event_id));
      setIsLoading(false);
      setEvenData(null);
    } catch (err) {
      console.log(err);
      logFirebaseAnalyticsEvent(AnalyticsEvents.NEW_EVENT_FAILED, { err });
      setIsError(true);
      setIsLoading(false);
    }
  };

  const closeModal = (): void => {
    setEventId(null);
    setIsError(false);
  };

  return (
    <section
      className={`${
        isLoading ? 'grid h-screen mt-[-100px] items-center justify-center relative' : 'flex grow justify-center w-full'
      }`}
    >
      <Modal isOpen={Boolean(eventId)} onClose={closeModal}>
        <SuccessCreateMessage eventId={eventId} claimStrings={claimStrings} />
      </Modal>
      <Modal isOpen={isError} onClose={closeModal}>
        <ErrorCreateMessage />
      </Modal>
      <Loader is_load={isLoading}>
        <EventForm submitForm={createNewEvent} event_data={event_data} toggle={toggleEventPrivateSettings} />
      </Loader>
    </section>
  );
};

interface SuccessMessageProps {
  eventId: number | null;
  claimStrings: string[];
}

const SuccessCreateMessage: React.FC<SuccessMessageProps> = ({ eventId, claimStrings }) => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const claimLink = `${origin}/claim/${eventId}?strings=${claimStrings}`;
  const copyToClipBoard = async () => {
    navigator.clipboard.writeText(claimLink);
  };
  return (
    <>
      <h2 className="font-drukMedium text-black mb-2">Your Event Was Created</h2>
      <p className="text-[#3D3D3D] mb-2">
        You can see it&apos;s stats on the{' '}
        <a className="underline" href={`/event/${eventId}`}>
          event&apos;s page
        </a>
      </p>
      <p className="text-[#3D3D3D] mb-2">Your Claim Link for Reward:</p>
      <input type="text" className="w-full mb-4 text-black bg-white" value={claimLink} disabled />
      <button
        onClick={copyToClipBoard}
        type="button"
        className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Copy
      </button>
    </>
  );
};

export default CreateNewEvent;
