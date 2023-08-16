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
}

const EventDetailedPage: NextPage<EventDetailedPageProps> = ({
  eventId,
  eventData,
  eventStats,
  eventActions,
  quest
}) => {
  return (
    <PageLayout title={eventData?.eventName} description={eventData?.eventDescription} pageName="Dashboard">
      <EventDetails
        eventId={eventId}
        eventActions={eventActions}
        eventStats={eventStats}
        eventData={eventData}
        quest={quest}
        isActive={true}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query, res }: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, s-maxage=0, stale-while-revalidate=10');
  const event_id = query.slug;

  const [eventInfo, eventActions] = await Promise.all([
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
    })
  ]);

  return {
    props: {
      eventId: Number(event_id),
      eventData: (eventInfo as any)?.eventData,
      eventStats: (eventInfo as any)?.eventStats,
      eventActions: eventActions,
      quest: (eventInfo as any)?.quest,
    },
  };
};

export default EventDetailedPage;
