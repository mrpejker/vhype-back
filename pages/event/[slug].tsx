/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GetServerSidePropsContext, NextPage } from 'next';
import { readContract } from '@wagmi/core';
import PageLayout from '../../components/page-layout';
import EventDetails from '../../features/events-details';
import eventsContractAbi from '../../abis/events-abi.json';
import { CAMINO_CHAIN_ID, CAMINO_EVENTS_CONTRACT_ADDRESS } from '../../constants/endpoints';
import { IEvent, IEventData, IEventStats, IQuest } from '../../models/Event';

interface EventDetailedPageProps {
  eventId: number;
  eventActions: any;
  eventData: IEventData;
  eventStats: IEventStats;
  quest: IQuest;
  isActive: boolean;
}

const EventDetailedPage: NextPage<EventDetailedPageProps> = ({
  eventId,
  eventData,
  eventStats,
  eventActions,
  quest,
  isActive
}) => {
  return (
    <PageLayout title={eventData?.eventName} description={eventData?.eventDescription} pageName="Dashboard">
      <EventDetails
        eventId={eventId}
        eventActions={eventActions}
        eventStats={eventStats}
        eventData={eventData}
        quest={quest}
        isActive={isActive}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query, res }: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, s-maxage=0, stale-while-revalidate=10');
  const event_id = query.slug;

  const [eventInfo, eventActions, currentTimestamp] = await Promise.all([
    readContract({
      address: CAMINO_EVENTS_CONTRACT_ADDRESS,
      abi: eventsContractAbi,
      functionName: 'getEvent',
      args: [
        Number(event_id)
      ],
      chainId: CAMINO_CHAIN_ID
    }),
    readContract({
      address: CAMINO_EVENTS_CONTRACT_ADDRESS,
      abi: eventsContractAbi,
      functionName: 'getEventActions',
      args: [
        Number(event_id),
        0,
        100,
      ],
      chainId: CAMINO_CHAIN_ID
    }),
    readContract({
      address: CAMINO_EVENTS_CONTRACT_ADDRESS,
      abi: eventsContractAbi,
      functionName: 'getCurrentTimestamp',
      chainId: CAMINO_CHAIN_ID
    })
  ]);

  let isActive = true;

  const eventData: IEventData = (eventInfo as any)?.eventData;
  if (eventData) {
    if (eventData?.isAvailable && Number(eventData?.finishTime) >= Number(currentTimestamp)) {
      isActive = true;
    } else {
      isActive = false;
    }
  }

  return {
    props: {
      eventId: Number(event_id),
      eventData: eventData,
      eventStats: (eventInfo as any)?.eventStats,
      eventActions: eventActions,
      quest: (eventInfo as any)?.quest,
      isActive,
    },
  };
};

export default EventDetailedPage;
