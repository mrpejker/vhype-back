/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import { useWalletSelector } from '../../../contexts/WalletSelectorContext';
import { getConnectedContract } from '../../../utils/contract';
import { communitiesContractMethods, communitiesContractName } from '../../../utils/contract-methods';
import { isEnvProd } from '../../../utils';
// import { Endpoints } from '../../../constants/endpoints';
import Modal from '../../../components/modal';
import NotAuthorizedBlock from '../../../components/not-authorized';

import * as wasm from '@vself_project/shared-utils';
import Link from 'next/link';
import TrashIcon from '../../../components/icons/TrashIcon';
import Head from 'next/head';
import Toast from '../../../components/toast';

// The same interface is used in vstudio/communities page
interface ICommunityInfo {
  community_id: string;
  community_owner: string;
  community_name: string;
  community_description: string;
  community_source_image: any;
  members?: string[];
}

// TODO Move this function to utils
export const getRandomInt = async (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};
export const toHexString = (byteArray: any) => {
  return Array.from(byteArray, (byte: any) => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};
export const downloadJsonFile = (json: string, filename: string) => {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const Communities: NextPage = memo(() => {
  const router = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${router.asPath}`;
  const {
    accountId,
    // selector
  } = useWalletSelector();
  const [communityInfo, setCommunityInfo] = useState<ICommunityInfo | null>();
  const [membershipKey, setMembershipKey] = useState<string>('');
  const [proofKey, setProofKey] = useState<string>('');
  const [proofGenerated, setProofGenerated] = useState<string>('');
  const [proofToVerify, setProofToVerify] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toastIsShown, setToastIsShown] = useState<boolean>(false);

  const initialize = useCallback(async () => {
    try {
      // Get random number to use as membership key
      const randomInt = await getRandomInt(1000000);

      // Get community info from contract
      const communityId = router.query.communityId;
      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);
      const result = await contract.get_community({ community_id: String(communityId) });
      const communityInfo: ICommunityInfo = {
        ...result[0],
        community_id: communityId,
        members: result[1],
      };

      // Update state
      setCommunityInfo(communityInfo);
      setMembershipKey(randomInt.toString());
    } catch (e) {
      console.log('error: ', e);
    }
  }, [router.query.communityId]);

  useEffect(() => {
    (async () => {
      await initialize();
    })();
  }, [initialize]);

  // Create commitment ans save it in the contract
  const joinCommunity = async () => {
    try {
      setIsLoading(true);

      // Create commitment from membershipKey
      const image = wasm.mimc_hash(BigInt(membershipKey), BigInt(membershipKey));
      const commitment = toHexString(image.image_bytes);

      // Save commitment in the contract
      const community_id = router.query.communityId;

      // Initialize contract instance
      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);
      const members = await contract.get_community_members({ community_id: String(community_id) });

      // Check that commitment is not included in members list
      if (members.includes(commitment)) {
        setModalTitle('This commit has already been recorded.');
        setModalMessage('');
        setShowModal(true);
        setIsLoading(false);
        return;
      }

      // Call contract
      const result = await contract.add_member({
        args: { community_id: String(community_id), commitment: commitment },
        gas: 300000000000000,
      });

      if (result) {
        setModalTitle('Congratulations!');
        setModalMessage(
          `You have joined the community ${communityInfo?.community_name}. Your membership key is ${membershipKey}. You will need it every time you generate proof.`
        );
        setShowModal(true);
      } else {
        setModalTitle('Something went wrong.');
        setModalMessage('You were unable to join the community.');
        setShowModal(true);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setModalTitle('Something went wrong.');
      setModalMessage('You were unable to join the community.' + err);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  // Generate proof using proofKey
  const getProof = async () => {
    try {
      setIsLoading(true);

      // Initialize contract instance
      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);

      // Get list of commitments and convert it to bytes
      const community_id = router.query.communityId;
      const members = await contract.get_community_members({ community_id: String(community_id) });
      const set = members.map((value: any) => {
        return { image_bytes: Buffer.from(value, 'hex') };
      });

      // Create proof from proofKey and atart proof downloading
      const result = wasm.prove_set_membership(set, BigInt(proofKey), BigInt(proofKey));
      const proof_str = JSON.stringify(result);
      downloadJsonFile(proof_str, 'proof.json');

      // Update state
      setProofGenerated(proof_str);
      setModalTitle('Proof generated!');
      setModalMessage('You can use it to verify your membership.');
      setShowModal(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setModalTitle('Something went wrong.');
      setModalMessage('A proof was not generated. ' + err);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  // Verify `proofToVerify` using wasm
  const verifyMembership = async () => {
    try {
      setIsLoading(true);

      // Initialize contract instance
      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);

      // Get list of commitments and convert it to bytes
      const community_id = router.query.communityId;
      const members = await contract.get_community_members({ community_id: String(community_id) });
      const set = members.map((value: any) => {
        return { image_bytes: Buffer.from(value, 'hex') };
      });

      // Make verification and show the result
      const result = wasm.verify_set_membership(set, JSON.parse(proofToVerify));
      if (result) setModalTitle('Successful verification');
      else setModalTitle('Verification failed');
      setModalMessage('');
      setShowModal(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setModalTitle('Something went wrong.');
      setModalMessage('Verification failed. ' + err);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  // It's used for file input
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, 'utf-8');
      reader.onload = (event) => {
        const data = event.target?.result as string;
        setProofToVerify(data);
      };
    }
    setSelectedFile(file);
  };

  // Open file picker
  const handleFilePickerButton = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleFileChange;
    input.click();
  };

  // Remove community
  const removeCommunity = async () => {
    try {
      setIsLoading(true);

      // Call smart contract from user account
      const community_id = router.query.communityId;
      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);
      const res = await contract.remove_community({ community_id: String(community_id) });

      if (res) {
        router.push('/vstudio/communities');
        setIsLoading(false);
        return;
      }

      setModalTitle('Something went wrong.');
      setModalMessage('Community was not removed.');
      setShowModal(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setModalTitle('Something went wrong.');
      setModalMessage('Community was not removed. ' + err);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[120px] pb-[120px]">
      <Toast isShown={toastIsShown} message="Copied" />
      <Head>
        <title>{communityInfo?.community_name} in vStudio</title>
        <meta
          name="description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
          key="desc"
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content={`${communityInfo?.community_name} in vStudio`} />
        <meta
          property="og:description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
        />
        <meta
          property="og:image"
          content={
            communityInfo?.community_source_image ? communityInfo?.community_source_image : origin + '/ninja2.png'
          }
        />
      </Head>
      <div className="max-w-[1240px] w-full mb-[80px] px-[20px]">
        <span className="text-[#B1B1B1] font-inter">
          <Link href="/" className="underline">
            Main
          </Link>{' '}
          / Products /{' '}
          <Link href="/vstudio" className="underline">
            vStudio
          </Link>{' '}
          /{' '}
          <Link href="/vstudio/communities" className="underline">
            Communities
          </Link>{' '}
          / <b className="text-[#fff]">{communityInfo?.community_name}</b>
        </span>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="text-black w-full max-w-[300px] p-[40px]">
          <h3 className="font-drukMedium">{modalTitle}</h3>
          <p>{modalMessage}</p>
        </div>
      </Modal>
      <div className="flex flex-col bg-white rounded-[20px] text-[#3D3D3D] font-inter w-full max-w-[1240px] px-[40px] md:px-[80px] py-[40px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-[50px]">
          <div className={`flex w-[125px] rounded-full ${!accountId ? 'grayscale' : ''}`}>
            {communityInfo && communityInfo?.community_source_image && (
              <img src={communityInfo?.community_source_image} alt="community_source_image" width={125} height={125} />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-[20px] leading-10 font-extrabold font-grotesk tracking-[0.04em] mb-[15px]">
              {communityInfo?.community_name}
            </h1>
            <h3 className="text-[16px] leading-5 font-bold">{communityInfo?.community_description}</h3>
            <div className="mt-[15px]">
              <h5>
                <strong>administrator:</strong> {communityInfo?.community_owner}
              </h5>
              {accountId && (
                <h5>
                  <strong>members:</strong> {communityInfo && communityInfo?.members?.length}
                </h5>
              )}
            </div>
          </div>
          {accountId && (
            <button
              className="px-6 py-2.5 border-[1px] bg-[#FB40FF] border-[#FB40FF] text-white hover:text-[#FB40FF] font-medium text-xs leading-tight uppercase rounded-full hover:bg-transparent focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={() => {
                const url = isEnvProd ? 'https://vself.app/' : 'https://vself-dev.web.app/';
                copy(url + 'vstudio/communities/' + router.query.communityId);
                setToastIsShown(true);
                setTimeout(() => {
                  setToastIsShown(false);
                }, 1500);
              }}
            >
              Share link
            </button>
          )}
        </div>

        {/* Display when current user is a community owner */}
        {accountId == communityInfo?.community_owner && (
          <div className="flex flex-col">
            <hr className="mt-[30px] opacity-20" />
            <button
              disabled={isLoading}
              className="self-center md:self-auto relative flex justify-center gap-4 items-center hover:text-white w-fit mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#019FFF] text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={removeCommunity}
            >
              <span>Remove community</span>
              <TrashIcon className="top-[-2px]" />
            </button>
            <div className="text-left">
              <h1 className="text-[20px] text-[#3D3D3D] font-grotesk font-extrabold leading-[40px] tracking-[0.04em] my-[20px]">
                Members
              </h1>
              <div className="flex flex-wrap gap-[10px]">
                {communityInfo &&
                  communityInfo?.members &&
                  Object.values(communityInfo?.members).map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-[#F5F5F5] rounded-full text-[16px] text-[#3D3D3D] font-inter px-[15px] py-[5px]"
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Account ID isn't defined */}
        {!accountId && (
          <div className="mt-8">
            <NotAuthorizedBlock />
          </div>
        )}

        {/* General case */}
        {accountId && communityInfo && accountId != communityInfo?.community_owner && (
          <>
            <div className="flex flex-col text-left mt-[25px]">
              <h1 className="text-[20px] leading-10 font-extrabold font-grotesk">Join community</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] my-[5px] items-center">
                <div className="flex-none text-[16px] font-bold">signed as:</div>
                <div className="flex-initial">
                  <input
                    className="bg-[#F5F5F5] rounded-full w-full py-[5px] px-[15px]"
                    defaultValue={accountId}
                    placeholder="near_account.testnet"
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={joinCommunity}
                >
                  Join
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] my-[5px] items-center">
                <div className="flex-none text-[16px] font-bold">your membership key:</div>
                <div className="flex-initial">
                  <input
                    className="bg-[#F5F5F5] rounded-full w-full py-[5px] px-[15px]"
                    value={membershipKey}
                    placeholder="random number"
                    disabled
                  />
                </div>
                <button
                  className="px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={() => {
                    copy(membershipKey);
                    setToastIsShown(true);
                    setTimeout(() => {
                      setToastIsShown(false);
                    }, 1500);
                  }}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="flex flex-col text-left mt-[25px]">
              <h1 className="text-[20px] leading-10 font-extrabold font-grotesk">Get proof</h1>
              <h2 className="text-[14px]">Join the community before generate proof</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] my-[5px] items-center">
                <div className="flex-none text-[16px] font-bold">signed as:</div>
                <div className="flex-initial">
                  <input
                    className="bg-[#F5F5F5] rounded-full w-full py-[5px] px-[15px]"
                    defaultValue={accountId}
                    placeholder="near_account.testnet"
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="self-end px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={getProof}
                >
                  Generate Proof
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] my-[5px] items-center">
                <div className="flex-none text-[16px] font-bold">membership key:</div>
                <div className="flex-initial">
                  <input
                    className="bg-[#F5F5F5] rounded-full w-full py-[5px] px-[15px]"
                    placeholder="Put your membership key"
                    value={proofKey}
                    onChange={(e) => {
                      setProofKey(e.target.value);
                    }}
                  />
                </div>
                <button
                  disabled={proofGenerated === ''}
                  className={`w-full ${
                    proofGenerated === '' && 'opacity-20'
                  } px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                  onClick={() => {
                    copy(proofGenerated);
                    setToastIsShown(true);
                    setTimeout(() => {
                      setToastIsShown(false);
                    }, 1500);
                  }}
                >
                  Copy Proof
                </button>
              </div>
            </div>

            <div className="flex flex-col text-left mt-[25px]">
              <h1 className="text-[20px] leading-10 font-extrabold font-grotesk">Verify proof</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] my-[5px] items-center">
                <div className="flex text-[16px] font-bold">proof:</div>
                <button
                  className="px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  onClick={handleFilePickerButton}
                >
                  {selectedFile ? selectedFile.name : 'Open File Picker'}
                </button>
                <button
                  className={`w-full ${
                    proofToVerify === '' && 'opacity-20'
                  } px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out`}
                  onClick={verifyMembership}
                >
                  Verify
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] my-[5px] items-center">
                <div className="flex-none text-[16px] font-bold"></div>
                <input
                  className="bg-[#F5F5F5] rounded-full w-full py-[5px] px-[15px]"
                  placeholder="Put your proof"
                  value={proofToVerify}
                  onChange={(e) => {
                    setProofToVerify(e.target.value);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default Communities;
