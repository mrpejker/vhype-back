import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { EventAction, IEventStats, IEventData, IQuest, IEventAction } from '../../models/Event';
// Components
import EventActionsTable from './eventAcionsTable';
import EventCard from './eventCard';
import EventStatsTable from './eventStatsTable';
import Loader from '../../components/loader';
import Claims from '../claims';

interface EventDetailsProps {
  eventStats: IEventStats | undefined;
  eventData: IEventData | undefined;
  quest: IQuest | undefined;
  eventActions: IEventAction[];
  eventId: number;
  isActive: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventStats, eventData, quest, eventActions, eventId, isActive }) => {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState<`0x${string}` | undefined>(undefined);
  const [isOwnEvent, setIsOwnEvent] = useState<boolean>(false);

  useEffect(() => {
    setUserAddress(address);

    if (eventData && address) {
      if (eventData.eventOwner == address) {
        setIsOwnEvent(true);
      } else {
        setIsOwnEvent(false);
      }
    }
  }, [eventData, address]);

  return (
    <div className="flex-col flex max-w-[1240px] container">
      <section className="flex w-full justify-center mb-4 bg-white rounded-[40px]">
        <Loader is_load={!eventData}>
          <EventCard eventData={eventData} isOwnEvent={isOwnEvent} eventId={eventId} isActive={isActive} />
        </Loader>
      </section>

      <section className="flex flex-col w-full mb-4 py-[40px] overflow-x-auto bg-white rounded-[40px] justify-center">
        <Loader is_load={!eventStats}>
          <div className="flex flex-col w-full max-w-[1080px] mx-auto">
            <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">Event Stats</h2>
            <EventStatsTable eventStats={eventStats} />
          </div>
        </Loader>
      </section>

      {isOwnEvent && userAddress && <Claims eventId={Number(eventId)} eventData={eventData} quest={quest} />}

      <section className="flex flex-col w-full py-[40px] mb-4 overflow-y-auto bg-white rounded-[40px]">
        <Loader is_load={!eventActions}>
          <div className="flex flex-col w-full max-w-[1080px] mx-auto">
            <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">Actions</h2>
            <EventActionsTable
              isOwn={isOwnEvent}
              eventActions={eventActions?.slice(0).reverse()}
            />
          </div>
        </Loader>
      </section>
    </div>
  );
};

export default EventDetails;
