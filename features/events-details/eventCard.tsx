/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { useAccount, useContractEvent } from 'wagmi';
import { writeContract } from '@wagmi/core';
import Loader from '../../components/loader';
import Modal from '../../components/modal';
import { IEventData } from '../../models/Event';
import { formatTimeStampToLocaleDateString } from '../../utils';
import { CAMINO_CHAIN_ID, CAMINO_EVENTS_CONTRACT_ADDRESS } from '../../constants/endpoints';
import eventsContractAbi from "../../abis/events-abi.json";

interface EventCardProps {
  eventData: IEventData | undefined;
  isOwnEvent?: boolean;
  eventId?: number;
  isActive?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ eventData, isOwnEvent, eventId, isActive }) => {
  const { address } = useAccount();
  const [isStopOpened, setIsStopOpened] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hideStopEventButton, setHideStopEventButton] = useState<boolean>(false);

  const openStopEventModal = () => {
    setIsStopOpened(true);
  };

  const closeStopEventModal = () => {
    setIsStopOpened(false);
    setHideStopEventButton(false);
  };

  const stopEvent = async () => {
    try {
      setHideStopEventButton(true);
      setIsLoading(true);

      const tx = await writeContract({
        address: CAMINO_EVENTS_CONTRACT_ADDRESS,
        abi: eventsContractAbi,
        functionName: 'stopEvent',
        args: [
          Number(eventId)
        ],
        chainId: CAMINO_CHAIN_ID
      });

      console.log('tx', tx);
    } catch (err) {
      setHideStopEventButton(false);
      setIsError(true);
      setIsLoading(false);
    }
  };


  const unwatch = useContractEvent({
    address: CAMINO_EVENTS_CONTRACT_ADDRESS,
    abi: eventsContractAbi,
    eventName: 'StopEvent',
    listener(log) {
      try {
        if (log) {
          if ((log[0] as any).args.userAddress == address) {
            setIsSuccess(true);
            setIsLoading(false);
          }
        }
      } catch { }

      if (log.length > 0) unwatch?.()
    },
  });

  return (
    <>
      <Modal isOpen={isStopOpened} onClose={closeStopEventModal}>
        <Loader is_load={isLoading}>
          <div className="flex flex-col">
            <h2 className="font-drukBold text-[#3D3D3D] text-xl uppercase mb-2">Stop Event</h2>
            {isError && (
              <>
                <p className="font-drukMedium uppercase text-[#f24242] text-xl my-2">Error!</p>
                <p className="font-inter uppercase text-[#f24242] text-[14px]">Something Went Wrong</p>
              </>
            )}
            {isSuccess ? (
              <p className="font-interBold uppercase text-[#3D3D3D] mb-2">Event Was Successfully Stopped!</p>
            ) : (
              <p className="text-[#3D3D3D] mb-[20px]">Are you sure you want to stop this event?</p>
            )}
            {!isSuccess && (
              <button
                onClick={hideStopEventButton ? undefined : stopEvent}
                type="button"
                className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Stop
              </button>
            )}
          </div>
        </Loader>
      </Modal>
      <div className="flex flex-col w-full max-w-[1080px] sm:flex-row sm:max-w-1/2 p-[20px] text-black relative overflow-auto ">
        <div className="flex w-full sm:w-1/3 justify-center items-center mt-2 p-[10px]">
          <img src="/ninja2.png" alt="" className="" />
        </div>
        <div className="flex w-full sm:w-2/3 sm:p-6 mb-10 items-center justify-start">
          <div className="flex flex-col">
            <h5 className="text-black text-[30px] mb-[25px] font-drukMedium">{eventData?.eventName}</h5>

            <p className="text-base mb-4 text-[#3D3D3D]">{eventData?.eventDescription}</p>
            <p className="text-base mb-4 text-[#3D3D3D]">
              Start Time: {eventData?.startTime && formatTimeStampToLocaleDateString(Number(eventData.startTime))}
            </p>
            <p className="text-base mb-4 text-[#3D3D3D]">
              Finish Time: {eventData?.finishTime && formatTimeStampToLocaleDateString(Number(eventData.finishTime))}
            </p>
            {isOwnEvent && isActive && !isSuccess && (
              <button
                onClick={openStopEventModal}
                type="button"
                className="flex my-4 self-start px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Stop Event
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
