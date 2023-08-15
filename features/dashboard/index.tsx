import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Collection, IEventData } from '../../models/Event';
import Loader from '../../components/loader';
import NotAuthorizedBlock from '../../components/not-authorized';
import { getConnectedContract } from '../../utils/contract';
import EventTable from './event-table';

interface EventsDashboardProps {
  ongoingEventDatas: IEventData[];
}

const EventsDashboard: React.FC<EventsDashboardProps> = ({ ongoingEventDatas }) => {
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
  const [userOngoingEvents, setUserOngoingEvents] = useState<IEventData[]>([]);

  useEffect(() => {
    // This function retrieves the user ongoing events and sets them in the state
    const getEventsStats = async (): Promise<void> => {
      if (address) {
        const userOngoingEvents = ongoingEventDatas.filter(x => x.eventOwner == address);
        setUserOngoingEvents(userOngoingEvents);
      } else {
        setUserOngoingEvents([]);
      }
    };

    setUserAddress(address);
    getEventsStats();
  }, [address]);

  return (
    <div className="flex flex-col w-full px-[20px] py-[40px] max-w-[1240px] rounded-[40px] bg-white items-center justify-center mb-[40px]">
      <section className="flex flex-col p-6 pb-10 flex-wrap max-w-[1080px] w-full mb-4 text-[#D9D9D9] overflow-x-auto">
        <h2 className="font-drukBold text-black uppercase mt-0 mb-4 text-[30px]">Ongoing Events</h2>
        {/* Displays a loader if ongoing events are being loaded */}
        <Loader is_load={ongoingEventDatas.length === 0}>
          {/* Renders the list of ongoing events */}
          <EventTable events={ongoingEventDatas} />
        </Loader>
        {/* Displays a message to add new event when there are no ongoing events */}
        {userAddress && !userOngoingEvents.length && (
          <div className="text-center mt-8">
            <p className="text-[#3D3D3D] mb-5">It seems, you don&apos;t have any ongoing events yet</p>
            <Link
              href="/add"
              className="mt-4 text-[16px] font-inter px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Add New Event
            </Link>
          </div>
        )}
        {/* Displays the NotAuthorizedBlock if there is no logged in user */}
        {!userAddress && (
          <div className="mt-8">
            <NotAuthorizedBlock />
          </div>
        )}
      </section>

      {/* Displays a list of the user ongoing events */}
      {userAddress && userOngoingEvents.length > 0 && (
        <section className="flex flex-col flex-wrap p-6 pb-10 max-w-[1080px] mb-4 text-[#D9D9D9] overflow-x-auto bg-white w-full rounded-xl ">
          <h2 className="font-drukBold text-black uppercase mt-0 mb-[25px] text-[30px]">Your Ongoing Events</h2>
          {/* Displays a loader if user's ongoing events are being loaded */}
          <Loader is_load={!userOngoingEvents.length}>
            {/* Renders the list of the user's ongoing events */}
            <EventTable events={userOngoingEvents} />
          </Loader>
        </section>
      )}
    </div>
  );
};

export default EventsDashboard;
