/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { readContract } from '@wagmi/core';
import ClaimForm from '../../features/claims/claim-form';
import PageLayout from '../../components/page-layout';
import { CAMINO_CHAIN_ID, CAMINO_EVENTS_CONTRACT_ADDRESS } from '../../constants/endpoints';
import { IEvent } from '../../models/Event';
import eventsContractAbi from '../../abis/events-abi.json';

interface ClaimPageProps {
  eventId: number;
}
const ClaimPage: NextPage<ClaimPageProps> = ({ eventId }) => {
  const [eventError, setEventError] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<IEvent | undefined>(undefined);
  const { asPath } = useRouter();

  // Check that event exists
  useEffect(() => {
    const tryGetEventData = async () => {
      const eventInfo = await readContract({
        address: CAMINO_EVENTS_CONTRACT_ADDRESS,
        abi: eventsContractAbi,
        functionName: 'getEvent',
        args: [
          eventId
        ],
        chainId: CAMINO_CHAIN_ID
      });

      if (!eventInfo) {
        setEventError(true);
      }
      else {
        setEventInfo(eventInfo as IEvent);
      }
    };

    tryGetEventData();
  }, []);

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`; // to do it's not used
  return (
    <PageLayout
      title="Claim Your NFT Reward"
      description="Claim Your NFT Reward"
      category="Products"
      pageName="Claim Your NFT Reward"
    >
      {eventError ? (
        <section className="flex flex-col w-full items-center mt-[120px] px-[20px]">
          <div className="flex flex-col w-full bg-white p-[20px] rounded-lg max-w-[600px] my-[40px]">
            <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Something went wrong</h2>
            <p className="text-[#3D3D3D]">{`The event ${eventId} is not found `}</p>
          </div>
        </section>
      ) : (
        <section className="flex flex-col w-full items-center">
          <div className="flex flex-col w-full bg-white p-[20px] rounded-lg max-w-[600px] my-[40px]">
            <ClaimForm eventId={Number(eventId)} eventStats={eventInfo?.eventStats} />
          </div>
        </section>
      )}
    </PageLayout>
  );
};

ClaimPage.getInitialProps = async ({ query }) => {
  const eventId = query.slug;

  return {
    eventId: Number(eventId),
  };
};

export default ClaimPage;
