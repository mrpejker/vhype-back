/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import type { NextPage } from 'next';

import Loader from '../../components/loader';
import Modal from '../../components/modal';
import { linkDropMethods, linkDropName } from '../../utils/contract-methods';
import { createNearAccount } from '../../utils/contract';
import { isEnvProd } from '../../utils';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import NewNearIDInput from '../../components/masked-input';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { logFirebaseAnalyticsEvent } from '../../utils/firebase';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Toast from '../../components/toast';

const RULES = 'Your account ID can contain any of the following:';
const RULE1 = 'Lowercase characters (a-z)';
const RULE2 = 'Digits (0-9)';
const RULE3 = 'Characters (_-) can be used as separators';
const RULES2 = 'Your account ID CANNOT contain:';
const RULE4 = 'Characters "@" or "."';
const RULE5 = 'Fewer than 2 characters';
const RULE6 = 'More than 64 characters (including .near)';

const wallet_url = isEnvProd ? 'https://mynearwallet.com/' : 'https://testnet.mynearwallet.com/';

const OnboardPage: NextPage = () => {
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  const [nearid, setNearid] = React.useState('');
  const [message, setMessage] = React.useState<JSX.Element | null>(null);
  const [seed, setSeed] = React.useState(null);
  const [showSeed, setShowSeed] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [toastIsShown, setToastIsShown] = React.useState<boolean>(false);
  const { modal } = useWalletSelector();

  const handleAuth = async () => {
    modal.show();
  };

  const FAILURE_MESSAGE = () => {
    return (
      <>
        <h2 className="font-drukMedium uppercase text-[#f24242] text-xl my-2 text-center">
          Sorry, it seems desired name has already been taken or we ran out of free accounts.{' '}
        </h2>
        <p className="text-[#3D3D3D]">
          Please contact us on social media or email{' '}
          <a className="underline text-[#f24242]" href="mailto:info@vself.app">
            info@vself.app
          </a>{' '}
          and we will guide you through onboarding.
        </p>
      </>
    );
  };
  '' + '';
  // const SUCCESS_MESSAGE = () => {
  //   return (
  //     <>
  //       <h2 className="font-drukBold text-[#3D3D3D] text-xl uppercase mb-2">
  //         Congrats! You have claimed your free NEAR account!
  //       </h2>{' '}
  //       <p className="text-[#3D3D3D]">
  //         {' '}
  //         Click here{' '}
  //         <a href={wallet_url} className="hover:underline text-[#41f092]" target="_blank">
  //           `🖤`NEAR`🖤`
  //         </a>
  //         , if you want to login to your account now. Please don’t forget to write down your mnemonic phrase and use the
  //         official NEAR wallet in the future. That is where your reward will be stored.
  //       </p>
  //     </>
  //   );
  // };

  const ACCOUNT_IS_BUSY = () => (
    <p className="text-[#3D3D3D]">This account name is already taken. please, choose a different one</p>
  );

  // Call contract method
  const callCreateAccount = async () => {
    try {
      setIsLoading(true);
      logFirebaseAnalyticsEvent(AnalyticsEvents.ONBOARDING, {});
      // If account is busy show the message
      const checkAccountResponse = await fetch('/api/check-account?nearid=' + nearid);
      const isAccountAlreadyExists = await checkAccountResponse.json();
      if (isAccountAlreadyExists) {
        setMessage(ACCOUNT_IS_BUSY);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return;
      }
      const { result, seedPhrase } = await createNearAccount(nearid, linkDropName, linkDropMethods);

      if (result) {
        // setMessage(SUCCESS_MESSAGE);
        setSeed(seedPhrase);
      } else {
        setIsError(true);
        logFirebaseAnalyticsEvent(AnalyticsEvents.ONBOARDING_FAILED, { reason: 'could not create near account' });
        setMessage(FAILURE_MESSAGE);
        setTimeout(() => {
          setMessage(null);
          setIsError(false);
        }, 10000);
      }
      return;
    } catch (err) {
      console.log(err);
      setIsError(true);
      logFirebaseAnalyticsEvent(AnalyticsEvents.ONBOARDING_FAILED, { err });
      setMessage(FAILURE_MESSAGE);
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 10000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const downloadSeed = () => {
    // Download seed on local machine (for reliability)
    // https://stackoverflow.com/questions/65050679/javascript-a-simple-way-to-save-a-text-file
    if (!seed) return;
    const fileName = nearid + '.seed.txt';
    const fileContent = seed;
    const myFile = new Blob([fileContent], { type: 'text/plain' });

    window.URL = window.URL || window.webkitURL;
    const dlBtn = document.getElementById('download');

    dlBtn?.setAttribute('href', window.URL.createObjectURL(myFile));
    dlBtn?.setAttribute('download', fileName);
    dlBtn?.click();
    setToastIsShown(true);
    setTimeout(() => {
      setToastIsShown(false);
    }, 1500);
  };
  const network = isEnvProd ? '.near' : '.testnet';

  const onEventNearIDChange = (nearid: string): void => {
    setNearid(nearid);
  };

  // TESTNET/MAINNET
  const placeholder = 'new_account' + network;

  const closeModal = () => {
    setMessage(null);
  };

  const copySeedToClipboard = () => {
    navigator.clipboard.writeText(String(seed));
  };

  const toggleSeed = () => {
    setShowSeed(!showSeed);
  };

  return (
    <main
      className={`${
        isLoading
          ? 'grid h-screen pt-[120px] items-center relative'
          : 'flex flex-col items-center justify-center  text-black px-[20px] pt-[120px] pb-[80px]'
      }`}
    >
      <Toast isShown={toastIsShown} message="Downloaded" />
      <Head>
        <title>Onboard to vSelf</title>
        <meta
          name="description"
          content="Your guide through the onboarding process to receive your NFT rewards in the vSelf app."
          key="desc"
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="Onboard to vSelf" />
        <meta
          property="og:description"
          content="Your guide through the onboarding process to receive your NFT rewards in the vSelf app."
        />
        <meta property="og:image" content={origin + '/ninja2.png'} />
      </Head>
      <Modal isOpen={!!message} onClose={closeModal}>
        <div className={!isError ? 'text-[#D9D9D9]' : 'text-[#D8000C]'}>{message}</div>
      </Modal>
      {!isLoading && (
        <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
          <span className="text-[#B1B1B1] font-inter">
            <Link href="/" className="underline">
              Main
            </Link>{' '}
            / Resources / <b className="text-[#fff]">Onboard</b>
          </span>
        </div>
      )}
      <Loader is_load={isLoading}>
        <div className="bg-white rounded-[20px] py-[40px] mb-[40px] max-w-[1240px] w-full ">
          <div className="flex flex-col md:flex-row px-[20px] pb-0 justify-between gap-[20px] max-w-[1080px] mx-auto">
            <div className="flex flex-col md:w-1/2">
              <h2 className="font-drukBold text-black uppercase mb-4 text-[32px]">Onboard</h2>
              {!seed && (
                <p>
                  Welcome to the page which will guide you through the onboarding process. To receive your NFT rewards
                  in the vSelf app, you should first create a NEAR account. If you do not have one, we&apos;ve got your
                  back! Just choose a nickname with the format &quot;newaccount{network}&quot; and type in below.
                </p>
              )}
              {seed && (
                <p className="w-96 mb-[10px] pr-[10px]">
                  To operate your newly registered account use your mnemonic seed phrase to login to{' '}
                  <a href={wallet_url} target="_blank" className="underline">
                    official NEAR wallet
                  </a>
                </p>
              )}
              {seed === null ? (
                <div className="flex flex-col">
                  <div className="flex flex-col w-full my-[10px]">
                    <p>{RULES}</p>
                    <p style={{ fontSize: 14 }}>{' - ' + RULE1}</p>
                    <p style={{ fontSize: 14 }}>{' - ' + RULE2}</p>
                    <p style={{ fontSize: 14 }}>{' - ' + RULE3}</p>
                  </div>
                  <div className="flex flex-col max-w-[400px] w-full mb-[14px]">
                    <p>{RULES2}</p>
                    <p style={{ fontSize: 14 }}>{' - ' + RULE4}</p>
                    <p style={{ fontSize: 14 }}>{' - ' + RULE5}</p>
                    <p style={{ fontSize: 14 }}>{' - ' + RULE6}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  {showSeed && (
                    <div className="flex flex-col max-w-[400px] mb-2 px-[20px]">
                      <h3>
                        Your Seed Account: <span className="text-red-700">{nearid}</span>
                      </h3>
                      <h3>Your Seed Phrase:</h3>
                      <div className="border-2 p-2 my-4 border-amber-300">
                        <div className="text-red-700">{seed}</div>
                      </div>
                      <div className="flex justify-center items-center mt-8">
                        <button
                          className="flex my-4 self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          type="button"
                          onClick={downloadSeed}
                        >
                          Downlad Your Seed Phrase
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col md:w-1/2 flex-1 items-center self-stretch justify-center">
              {!seed ? (
                <div className="bg-[#343434] flex grow flex-col flex-1 w-full items-center justify-center max-w-[400px] rounded-[20px] p-[20px] bg-[url(/fly.png)] bg-no-repeat bg-left bg-contain">
                  <div className="max-w-[400px] w-full">
                    <NewNearIDInput onChange={onEventNearIDChange} inputValue={nearid} placeholder={placeholder} />
                  </div>
                  <div className="flex justify-center items-center mt-8">
                    <button
                      className="flex my-4 self-center px-6 py-2.5 bg-[#FB40FF] border-[1px] border-[#FB40FF] text-[#3D3D3D] hover:text-[#FB40FF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#343434] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      type="button"
                      onClick={callCreateAccount}
                    >
                      Claim NEAR Account
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#343434] flex grow flex-col flex-1 w-full items-center justify-center max-w-[400px] rounded-[20px] p-[20px] bg-[url(/fly.png)] bg-no-repeat bg-left bg-contain">
                  {showSeed ? (
                    <button
                      className="flex my-4 self-center px-6 py-2.5 bg-[#FB40FF] border-[1px] border-[#FB40FF] text-[#3D3D3D] hover:text-[#FB40FF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-transparent focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      type="button"
                      onClick={toggleSeed}
                    >
                      Hide Seed Phrase
                    </button>
                  ) : (
                    <button
                      className="flex my-4 self-center px-6 py-2.5 bg-[#FB40FF] border-[1px] border-[#FB40FF] text-[#3D3D3D] hover:text-[#FB40FF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-transparent focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      type="button"
                      onClick={toggleSeed}
                    >
                      Show Seed Phrase
                    </button>
                  )}
                  <button
                    className="flex my-4 self-center px-6 py-2.5 bg-[#FB40FF] border-[1px] border-[#FB40FF] text-[#3D3D3D] hover:text-[#FB40FF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-transparent focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="button"
                    onClick={copySeedToClipboard}
                  >
                    Copy Seed Phrase
                  </button>
                  <button
                    className="flex my-4 self-center px-6 py-2.5 bg-[#FB40FF] border-[1px] border-[#FB40FF] text-[#3D3D3D] hover:text-[#FB40FF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-transparent focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                    type="button"
                    onClick={handleAuth}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Loader>
      <a href="#" id="download" style={{ visibility: 'hidden' }}>
        Download
      </a>
    </main>
  );
};

export default OnboardPage;
