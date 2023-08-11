import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActiveLink from '../../components/active-link';
import Loader from '../../components/loader';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { logFirebaseAnalyticsEvent } from '../../utils/firebase';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

const DEFAULT_ERROR_MESSAGE = 'Checkin failed. Please try again or feel free to reach us via email: info@vself.app';

interface ClaimFormProps {
  event_id: number;
  account_id?: string | null;
  claimString?: string;
  isPrivate?: boolean;
}

const ClaimForm: React.FC<ClaimFormProps> = ({ event_id, claimString, isPrivate }) => {
  const { modal, accountId, selector } = useWalletSelector();
  const [nearId, setNearId] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>(DEFAULT_ERROR_MESSAGE);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const claimLink = `/api/checkin?eventid='${event_id}'&nearid='${nearId}'&qr='${claimString}'`;
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query && query.errorMessage) {
      //setError(decodeURI(query.errorMessage as string));
      setIsError(true);
    }
  }, [query]);

  useEffect(() => {
    if (accountId) {
      setNearId(accountId);
    }
  }, [accountId]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setIsAuthError(false);
    setIsSuccess(false);
    setIsError(false);
    setNearId(value);
  };

  const handleAuth = async () => {
    modal.show();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (!claimString) {
      setIsLoading(false);
      setIsAuthError(true);
      return;
    }
    if (isPrivate && !accountId) {
      setIsLoading(false);
      setIsAuthError(true);
      return;
    }

    try {
      const { contract } = await getConnectedContract();
      const settings = await contract.get_collection_settings({ event_id });
      if (settings && settings.limited_collection) {
        const wallet = await selector.wallet();
        await wallet.signAndSendTransaction({
          signerId: accountId!,
          receiverId: mainContractName,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'checkin',
                args: { event_id: event_id, username: nearId, request: claimString },
                gas: '300000000000000',
                deposit: '25000000000000000000000',
              },
            },
          ],
        });

        // TO DO : Check if transaction is successfull or not and log analytics
      } else {
        // Claim using server
        const response = await fetch(claimLink);
        const result = await response.json();
        if (result.index > -1) {
          setIsSuccess(true);
          logFirebaseAnalyticsEvent(AnalyticsEvents.CLAIM_REWARD_SUCCESS, {});
        } else {
          logFirebaseAnalyticsEvent(AnalyticsEvents.CLAIM_REWARD_FAILED, {});
          setIsError(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Loader is_load={isLoading}>
      <>
        <div className="text-left">
          <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Claim Reward</h2>
          <p className="text-[#3D3D3D]">Provide an Near ID to get reward</p>
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
              disabled={isPrivate}
              value={nearId}
              onChange={handleInputChange}
              placeholder="Near ID"
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
          {!accountId && (
            <p className="text-[#3D3D3D] mt-[10px]">
              Don&apos;t have an account? Use our{' '}
              <ActiveLink href="/onboard" className="underline hover:no-underline">
                <span>onboarding page</span>
              </ActiveLink>
            </p>
          )}
        </div>
      </>
    </Loader>
  );
};

export default ClaimForm;
