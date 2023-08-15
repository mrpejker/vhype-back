/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GetServerSidePropsContext, NextPage } from 'next';
import { readContract } from '@wagmi/core'
import PageLayout from '../../components/page-layout';
import { getConnectedContract } from '../../utils/contract';
import EventDetails from '../../features/events-details';
import eventsContractAbi from '../../abis/events-abi.json';
import { CAMINO_CHAIN_ID, CAMINO_EVENTS_CONTRACT_ADDRESS } from '../../constants/endpoints';

interface EventDetailedPageProps {
  event_id: number;
  event_actions: any;
  event_stats: any;
  event_data: any;
  isActive: boolean;
}

const EventDetailedPage: NextPage<EventDetailedPageProps> = ({
  event_id,
  event_actions,
  event_stats,
  event_data,
  isActive,
}) => {
  return (
    <PageLayout title={event_data?.event_name} description={event_data?.event_description} pageName="Dashboard">
      <EventDetails
        event_id={event_id}
        event_actions={event_actions}
        event_stats={event_stats}
        event_data={event_data}
        isActive={isActive}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query, res }: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, s-maxage=0, stale-while-revalidate=10');
  const event_id = query.slug;

  // const ongoingEventDatas = await readContract({
  //   address: CAMINO_EVENTS_CONTRACT_ADDRESS,
  //   abi: eventsContractAbi,
  //   functionName: 'getOngoingEventDatas',
  //   args: [
  //     0, // fromIndex
  //     100, // limit,
  //     true, // isAll
  //   ],
  //   chainId: CAMINO_CHAIN_ID
  // });

  const { contract } = await getConnectedContract();
  const [actions, stats, data, activeEvents]: any = await Promise.all([
    contract.get_event_actions({ event_id: Number(event_id), from_index: 0, limit: 100 }),
    contract.get_event_stats({ event_id: Number(event_id) }),
    contract.get_event_data({ event_id: Number(event_id) }),
    contract.get_ongoing_events({ from_index: 0, limit: 150 }),
  ]);
  const isActive = activeEvents.find((element: any) => String(event_id) === String(element[0])) !== undefined;
  return {
    props: {
      event_id: Number(event_id),
      event_actions: actions,
      event_stats: stats,
      event_data: data,
      isActive,
    },
  };
};

export default EventDetailedPage;
