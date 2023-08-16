import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount, useContractEvent } from 'wagmi';
import { writeContract } from '@wagmi/core';
import { useWeb3Modal } from '@web3modal/react';
import Loader from '../../components/loader';
import { IEventStats } from '../../models/Event';
import { CAMINO_CHAIN_ID, CAMINO_EVENTS_CONTRACT_ADDRESS } from '../../constants/endpoints';
import eventsContractAbi from "../../abis/events-abi.json";

const DEFAULT_ERROR_MESSAGE = 'Checkin failed. Please try again or feel free to reach us via email: info@vself.app';

interface ClaimFormProps {
  eventId: number;
  eventStats: IEventStats | undefined;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ eventId, eventStats }) => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const [userAddress, setUserAddress] = useState<`0x${string}` | undefined>(undefined);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>(DEFAULT_ERROR_MESSAGE);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (eventStats) {
      setParticipants(eventStats?.participants);
    }
  }, [eventStats]);

  useEffect(() => {
    if (query && query.errorMessage) {
      //setError(decodeURI(query.errorMessage as string));
      setIsError(true);
    }
  }, [query]);

  useEffect(() => {
    setUserAddress(address);

    if (address) {
      setIsAuthError(false);
    }
  }, [address]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setIsAuthError(false);
    setIsSuccess(false);
    setIsError(false);
    setUserAddress(`0x${value}`);
  };

  const handleAuth = async () => {
    open();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!userAddress) {
      setIsLoading(false);
      setIsAuthError(true);
      return;
    }

    if (participants.includes(userAddress)) {
      setIsLoading(false);
      setIsSuccess(true);
      return;
    }

    try {
      const tx = await writeContract({
        address: CAMINO_EVENTS_CONTRACT_ADDRESS,
        abi: eventsContractAbi,
        functionName: 'checkin',
        args: [
          eventId,
          userAddress,
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

  const unwatch = useContractEvent({
    address: CAMINO_EVENTS_CONTRACT_ADDRESS,
    abi: eventsContractAbi,
    eventName: 'Checkin',
    listener(log) {
      try {
        if (log) {
          setParticipants(current => {
            return [...current, (log[0] as any).args.userAddress];
          });

          setIsSuccess(true);
          setIsLoading(false);
        }
      } catch { }

      if (log.length > 0) unwatch?.()
    },
  });

  return (
    <Loader is_load={isLoading}>
      <>
        <div className="text-left">
          <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Claim Reward</h2>
          <p className="text-[#3D3D3D]">Provide a CAMINO address to get reward</p>
        </div>
        {isSuccess && (
          <p className="text-center font-drukMedium uppercase text-black text-xl my-2">Succesfully Claimed</p>
        )}
        {isError && (
          <>
            <p className="font-drukMedium uppercase text-[#f24242] text-xl my-2 text-center">Error!</p>
            <p className="font-inter uppercase text-[#f24242] text-[14px] text-center">{error}</p>
          </>
        )}
        {isAuthError && (
          <>
            <p className="font-drukMedium uppercase text-[#f24242] text-xl my-2 text-center">Error!</p>
            <p className="font-inter uppercase text-[#f24242] text-[14px] text-center" data-testid="error-msg">
              You&apos;re not authorized! Please{' '}
              <button onClick={handleAuth} className="underline hover:no-underline cursor-pointer">
                sign in
              </button>
            </p>
          </>
        )}
        <div className="mt-2 p-2 rounded-lg">
          <form className="flex flex-row items-center" onSubmit={handleSubmit}>
            <input
              className="px-[10px] py-[5px] mr-2 w-full text-black bg-transparent border border-solid border-gray-300 rounded-full transition ease-in-out focus:border-black focus:outline-none"
              disabled={true}
              value={userAddress}
              onChange={handleInputChange}
              placeholder="Wallet Address"
              type="text"
            />
            <button
              className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              role="button"
              type="submit"
            >
              Claim
            </button>
          </form>
        </div>
      </>
    </Loader>
  );
};

export default ClaimForm;
