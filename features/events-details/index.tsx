import React, { useEffect, useState } from 'react';
import { EventAction, CollectionData, CollectionStats } from '../../models/Event';
// Components
import EventActionsTable from './eventAcionsTable';
import EventCard from './eventCard';
import EventStatsTable from './eventStatsTable';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { getFirestoreDocumentData } from '../../utils/firebase';
import Loader from '../../components/loader';
import Claims from '../claims';

interface EventDetailsProps {
  event_stats: CollectionStats | undefined;
  event_data: CollectionData | undefined;
  event_actions: EventAction[];
  event_id: number;
  isActive: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event_stats, event_data, event_actions, event_id, isActive }) => {
  const [claims, setClaims] = useState<string[]>([]);
  const { accountId } = useWalletSelector();
  const isOwnEvent = event_stats?.created_by === accountId;

  useEffect(() => {
    const getEventsStats = async (): Promise<void> => {
      if (isOwnEvent) {
        const res: any = await getFirestoreDocumentData('claims', String(event_id));
        if (res) {
          setClaims(res.claimStrings);
        }
      }
    };
    getEventsStats();
  }, [accountId, event_id, isOwnEvent]);

  return (
    <div className="flex-col flex max-w-[1240px] container">
      <section className="flex w-full justify-center mb-4 bg-white rounded-[40px]">
        <Loader is_load={!event_data}>
          <EventCard eventData={event_data} isOwnEvent={isOwnEvent} event_id={event_id} isActive={isActive} />
        </Loader>
      </section>

      <section className="flex flex-col w-full mb-4 py-[40px] overflow-x-auto bg-white rounded-[40px] justify-center">
        <Loader is_load={!event_stats}>
          <div className="flex flex-col w-full max-w-[1080px] mx-auto">
            <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">Event Stats</h2>
            <EventStatsTable eventStats={event_stats} />
          </div>
        </Loader>
      </section>

      {isOwnEvent && accountId && <Claims claims={claims} event_id={Number(event_id)} eventData={event_data} />}

      <section className="flex flex-col w-full py-[40px] mb-4 overflow-y-auto bg-white rounded-[40px]">
        <Loader is_load={!event_actions}>
          <div className="flex flex-col w-full max-w-[1080px] mx-auto">
            <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">Actions</h2>
            <EventActionsTable
              isOwn={isOwnEvent}
              eventActions={event_actions?.slice(0).reverse()}
              eventData={event_data}
            />
          </div>
        </Loader>
      </section>
    </div>
  );
};

export default EventDetails;
