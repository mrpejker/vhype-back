/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useAccount, useContractEvent } from 'wagmi';
import { writeContract } from '@wagmi/core';
import Loader from '../../components/loader';
import Modal from '../../components/modal';
import ErrorCreateMessage from './error-create';
import EventForm from './event-form';
import { resizeFile, uploadMetadataToIPFS } from '../../utils';
import { CollectionFormData, Quest } from '../../models/Event';
import { CAMINO_CHAIN_ID, CAMINO_EVENTS_CONTRACT_ADDRESS } from '../../constants/endpoints';
import eventsContractAbi from "../../abis/events-abi.json";

const CreateNewEvent: React.FC = () => {
  const { address } = useAccount();
  const [eventId, setEventId] = useState<number | null>(null);
  const [event_data, setEvenData] = useState<CollectionFormData | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isTransferable, setIsTransferable] = useState<boolean>(false);
  const [isLimited, setIsLimited] = useState<boolean>(false);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [warningItems, setWarningItems] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const { event_description, event_name, finish_time, start_time, quest, file } = eventData;

      console.log('eventData', eventData);

      let isValid = true;
      const warningItems = [];

      if (!event_name) {
        isValid = false;
        warningItems.push('Event title');
      }

      if (!event_description) {
        isValid = false;
        warningItems.push('Event Description');
      }

      if (!file) {
        isValid = false;
        warningItems.push('NFT image');
      }

      if (!quest?.reward_title) {
        isValid = false;
        warningItems.push('Reward title');
      }

      if (!quest?.reward_description) {
        isValid = false;
        warningItems.push('Reward description');
      }

      if (!isValid) {
        setWarningItems(warningItems);
        setIsWarning(true);

        return;
      }

      setIsLoading(true);
      setEvenData({
        ...eventData,
      });

      // Resize Images Before Upload
      const resizedFile = await resizeFile(file!);

      // Upload metadata To IPFS And Getiing Download URLS
      const meatadataUri = await uploadMetadataToIPFS(quest.reward_title, quest.reward_description, resizedFile);
      console.log('meatadataUri', meatadataUri);

      // Placing CIDs of Images to Request
      quest.reward_uri = meatadataUri;
      console.log('quest', quest);

      // Starting New Event In NEAR
      const tx = await writeContract({
        address: CAMINO_EVENTS_CONTRACT_ADDRESS,
        abi: eventsContractAbi,
        functionName: 'startEvent',
        args: [
          event_name as any,
          event_description as any,
          Math.floor(start_time / 10 ** 9),
          Math.floor(finish_time / 10 ** 9),
          ['qr_code', ...Object.values(quest)],
        ],
        chainId: CAMINO_CHAIN_ID
      });

      console.log('tx', tx);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const closeModal = (): void => {
    setEventId(null);
    setIsError(false);
  };

  const unwatch = useContractEvent({
    address: CAMINO_EVENTS_CONTRACT_ADDRESS,
    abi: eventsContractAbi,
    eventName: 'StartEvent',
    listener(log) {
      try {
        if (log) {
          if ((log[0] as any).args.userAddress == address) {
            setEventId(Number((log[0] as any).args.eventId));
            setIsLoading(false);
            setEvenData(null);
          }
        }
      } catch { }

      if (log.length > 0) unwatch?.()
    },
  });

  return (
    <section
      className={`${isLoading ? 'grid h-screen mt-[-100px] items-center justify-center relative' : 'flex grow justify-center w-full'
        }`}
    >
      <Modal isOpen={Boolean(eventId)} onClose={closeModal}>
        <SuccessCreateMessage eventId={eventId} />
      </Modal>
      <Modal isOpen={isError} onClose={closeModal}>
        <ErrorCreateMessage />
      </Modal>
      <Modal isOpen={isWarning} onClose={() => {
        setIsWarning(false);
        setWarningItems([]);
      }}>
        <>
          <h2 className="font-drukMedium text-orange-700 mb-4">Please input all informations.</h2>
          <p className="text-[#3D3D3D]">
            <b>{warningItems.join(", ")}</b> {warningItems.length > 1 ? 'are' : 'is'} missing.
          </p>
        </>
      </Modal>
      <Loader is_load={isLoading}>
        <EventForm submitForm={createNewEvent} event_data={event_data} toggle={toggleEventPrivateSettings} />
      </Loader>
    </section>
  );
};

interface SuccessMessageProps {
  eventId: number | null;
}

const SuccessCreateMessage: React.FC<SuccessMessageProps> = ({ eventId }) => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const claimLink = `${origin}/claim/${eventId}`;
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
