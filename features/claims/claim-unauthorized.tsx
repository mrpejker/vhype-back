import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/loader';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { logFirebaseAnalyticsEvent } from '../../utils/firebase';
import * as nearAPI from 'near-api-js';
import { Account, connect, KeyPair, keyStores } from 'near-api-js';
import { isEnvProd } from '../../utils';
import { mockMainNetUserAccount, mockUserAccount } from '../../mockData/mockUserAccount';
import Toast from '../../components/toast';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateSeedPhrase }: any = require('near-seed-phrase');

const WARNING_MESSAGE = `Warning! If you press "Proceed" without saving the passphrase, you won't be able to continue using the same account`;

interface ClaimFormProps {
  event_id: number;
  claimString?: string;
}

const ClaimFormUnauthorized: React.FC<ClaimFormProps> = ({ event_id, claimString }) => {
  const [nearId, setNearId] = useState<string>('');
  const [seed, setSeed] = useState<string | null>(null);
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      if (!claimString) {
        setIsLoading(false);
        return;
      }

      try {
        const { seedPhrase, publicKey } = generateSeedPhrase();
        setSeed(seedPhrase);
        //   console.log('Public Key: ', publicKey);
        //   console.log('Secret Key: ', secretKey);
        // Download seed on local machine (for reliability)
        // https://stackoverflow.com/questions/65050679/javascript-a-simple-way-to-save-a-text-file
        const account_id = (nearAPI.utils.PublicKey.fromString(publicKey).data as Buffer).toString('hex');
        const fundNearAccount = async (account_id: string, amount: string) => {
          const network = isEnvProd ? 'mainnet' : 'testnet';

          const fundingAccountID = isEnvProd
            ? String(mockMainNetUserAccount.account_id)
            : String(mockUserAccount.account_id);
          // const fundingAccountMnemonic =
          //   'sleep immense valve property spoon pepper letter chalk sea increase nose economy';
          // const secretKey =
          //   'ed25519:5EcJr9YEcpiHfKuoQSbU8WGRp71BuDUHUw9RURw2gzDx3AZdcJmhXBj4M2ymanb41cDyNbiTRjMqubxEZD58YXpX';
          const secretKey = isEnvProd
            ? String(mockMainNetUserAccount.private_key)
            : String(mockUserAccount.private_key);
          // To recover keys from the seed phrase
          // const { secretKey } = parseSeedPhrase(fundingAccountMnemonic);
          // console.log('Funding secret: ', secretKey);

          // Init keystore
          const keyStore = new keyStores.InMemoryKeyStore();
          await keyStore.setKey(network, fundingAccountID, KeyPair.fromString(secretKey));

          // Establish the configuration for the connection
          const nearConfig = {
            networkId: network,
            keyStore,
            nodeUrl: `https://rpc.${network}.near.org`,
            walletUrl: `https://wallet.${network}.near.org`,
            helperUrl: `https://helper.${network}.near.org`,
            explorerUrl: `https://explorer.${network}.near.org`,
          };

          // Connect to the NEAR blockchain and get the connection instance
          const near = await connect(nearConfig);
          // const pk = KeyPair.fromString(secretKey).getPublicKey();

          const account: Account = await near.account(fundingAccountID);
          await account.sendMoney(account_id, amount);
        };
        await fundNearAccount(account_id, '10000000000000000000000');

        const claimLink = `/api/checkin-sbt?eventid='${event_id}'&nearid='${account_id}'&qr='${claimString}'`;
        const response = await fetch(claimLink);
        const result = await response.json();
        if (result.index > -1) {
          setIsSuccess(true);
          setNearId(account_id);
          logFirebaseAnalyticsEvent(AnalyticsEvents.SBT_CLAIM_REWARD_SUCCESS, {});
        } else {
          logFirebaseAnalyticsEvent(AnalyticsEvents.SBT_CLAIM_REWARD_FAILED, {});
          setIsError(true);
        }
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    },
    [claimString, event_id]
  );

  const downloadSeed = () => {
    if (seed) {
      const fileName = 'TripMapAccount.txt';
      const myFile = new Blob([seed], { type: 'text/plain' });
      window.URL = window.URL || window.webkitURL;
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(myFile);
      link.download = fileName;
      link.click();
      setToastShown(true);

      // Close toast after 2.5 seconds
      setTimeout(() => {
        setToastShown(false);
      }, 3000);

      // Redirect to reward page after 3 seconds
      setTimeout(() => {
        proccedToReward();
      }, 3000);
    }
  };

  const proccedToReward = () => {
    router.push(`/vselfnfts/${nearId}`);
  };

  return (
    <>
      {isLoading && <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Getting your reward ready</h2>}
      <Loader is_load={isLoading}>
        <>
          <Toast
            isShown={toastShown}
            message="File with passphrase saved on your device. Keep  it to access your rewards account"
          />
          {!isSuccess ? (
            <div className="text-left">
              <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Claim Your Reward</h2>
              <p className="font-drukMedium uppercase text-[#019FFF] text-[12px] my-2 ">
                Push Claim button to participate in the Trip Map campaign. You will receive a passphrase that will
                provide access to your rewards account in the future.
              </p>
              {isError && (
                <>
                  <p className="font-drukMedium uppercase text-[#f24242] text-xl my-2 text-center">Error!</p>
                  <p className="font-inter uppercase text-[#f24242] text-[14px] text-center">
                    ID is invalid or event has expired!
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="text-left">
              <p className="font-drukMedium uppercase text-black text-xl my-2">Reward successfully claimed</p>
            </div>
          )}

          <div className="mt-2 p-2 rounded-lg">
            <form className="flex flex-col items-center justify-center gap-[20px]" onSubmit={handleSubmit}>
              {!isSuccess ? (
                <button
                  type="submit"
                  className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                >
                  Claim
                </button>
              ) : (
                <>
                  <button
                    onClick={downloadSeed}
                    type="button"
                    className="flex self-center px-6 py-2.5 border-[1px] bg-[#019FFF] border-[#019FFF] text-white hover:text-[#019FFF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-transparent focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    Download passphrase
                  </button>
                  <button
                    onClick={proccedToReward}
                    type="button"
                    className="flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[red] text-[red] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[red] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    Proceed without saving
                  </button>
                </>
              )}
              {isSuccess && (
                <>
                  <p className="text-[#3D3D3D] pb-0 mb-0">
                    Accept your passphrase file to keep access to your rewards account
                  </p>
                  <p className="text-[red] text-center">{WARNING_MESSAGE}</p>
                </>
              )}
            </form>
          </div>
        </>
      </Loader>
    </>
  );
};

export default ClaimFormUnauthorized;
