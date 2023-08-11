/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { type NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useState, useEffect } from 'react';
import { NFTStorage } from 'nft.storage';
import { useWalletSelector } from '../../../contexts/WalletSelectorContext';
import { communitiesContractMethods, communitiesContractName } from '../../../utils/contract-methods';
import { getConnectedContract } from '../../../utils/contract';
import Link from 'next/link';
import Head from 'next/head';

const CreateCommunity: NextPage = memo(() => {
  const { accountId } = useWalletSelector();
  const router = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const metaURL = `${origin}${router.asPath}`;
  const [selectedCommunityImg, setSelectedCommunityImg] = useState();
  const [previewCommunityImg, setPreviewCommunityImg] = useState<string>();
  const [communityName, setcommunityName] = useState<string>('');
  const [communitydescription, setcommunitydescription] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleCreateCommunity = async () => {
    if (!selectedCommunityImg) {
      setMessage('Please select a community image!');
      return;
    }

    if (!communityName) {
      setMessage('Please input a community name!');
      return;
    }

    if (!communitydescription) {
      setMessage('Please input a community description!');
      return;
    }

    try {
      setIsProcessing(true);
      let nftStorage;
      let communityImgUrl = '';
      try {
        setMessage('Uploading a community image...');
        if (process.env.NFT_STORAGE_API_KEY !== undefined) {
          nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });
        } else throw new Error('NFT_STORAGE_API_KEY is undefined');

        const communityImgMetadata = await nftStorage.store({
          name: communityName,
          description: communitydescription,
          image: selectedCommunityImg,
        });
        communityImgUrl = 'https://ipfs.io/ipfs/' + communityImgMetadata?.data?.image?.pathname?.split('//')[1]!;
      } catch (e) {
        setIsProcessing(false);
        console.log('uploading community image error: ', e);
        setMessage('Failed to upload community image.');
        return;
      }

      setMessage('Community creation...');
      const community_data = {
        community_owner: accountId,
        community_name: communityName,
        community_description: communitydescription,
        community_source_image: communityImgUrl,
      };

      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);
      const communityId = await contract.add_community({
        args: { community_data },
        gas: 300000000000000,
      });
      router.push(`/vstudio/communities/${communityId}`);
    } catch (error) {
      console.log(error);
      setMessage('Failed to create a new community.');
      setIsProcessing(false);
    }
  };

  const onSelectCommunityImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedCommunityImg(undefined);
      return;
    }

    setSelectedCommunityImg(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedCommunityImg) {
      setPreviewCommunityImg(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedCommunityImg);
    setPreviewCommunityImg(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedCommunityImg]);

  return (
    <div className="flex flex-col justify-center items-center pt-[120px] pb-[120px]">
      <Head>
        <title>Create Community in vStudio</title>
        <meta
          name="description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
          key="desc"
        />
        <meta property="og:url" content={metaURL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="Create Community in vStudio" />
        <meta
          property="og:description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
        />
        <meta property="og:image" content={origin + '/ninja2.png'} />
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
          / <b className="text-[#fff]">Create Community</b>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center bg-[#41F092] rounded-[20px] text-[#3D3D3D] font-inter max-w-[1240px] px-[80px] py-[40px]">
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-[20px]">
          <label className="flex cursor-pointer flex-col w-[125px] h-[125px] rounded-full border-none bg-white hover:bg-gray-100 relative">
            <div className="flex flex-col items-center justify-center pt-7">
              <svg width="44" height="47" viewBox="0 0 44 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.065 8.90784L21.189 4.78391V30.7647C21.189 31.4246 21.7666 32.0016 22.4259 32.0016C23.0858 32.0016 23.6629 31.424 23.6629 30.7647L23.6634 4.78391L27.7874 8.90784C28.0348 9.15523 28.365 9.2375 28.6947 9.2375C29.0243 9.2375 29.3546 9.15523 29.602 8.90784C30.0967 8.41306 30.0967 7.6709 29.602 7.17549L22.4265 0L15.251 7.17549C14.7562 7.67028 14.7562 8.41244 15.251 8.90784C15.828 9.40262 16.5702 9.40262 17.0649 8.90784H17.065Z"
                  fill="#D9D9D9"
                />
                <path
                  d="M39.2519 17.3207H27.6222C26.9623 17.3207 26.3853 17.8983 26.3853 18.5576C26.3853 19.2175 26.9629 19.7945 27.6222 19.7945H39.2519C40.4888 19.7945 41.4789 20.7841 41.4789 22.0216V42.2289C41.4789 43.4658 40.4894 44.456 39.2519 44.456L4.7758 44.4565C3.53885 44.4565 2.54873 43.467 2.54873 42.2295V16.4961C2.54873 15.2592 3.53829 14.2691 4.7758 14.2691H10.2195C11.1268 14.2691 11.9519 14.8467 12.2815 15.6711L12.694 16.7435C13.3539 18.558 15.1685 19.7951 17.0654 19.7951C17.7253 19.7951 18.3023 19.2174 18.3023 18.5581C18.3023 17.8982 17.7247 17.3212 17.0654 17.3212C16.1581 17.3212 15.333 16.7436 15.0034 15.9191L14.5909 14.8467C13.931 13.0322 12.1164 11.7952 10.2195 11.7952H4.7758C2.21911 11.7952 0.0742188 13.8571 0.0742188 16.4967V42.1476C0.0742188 44.7043 2.13619 46.8492 4.7758 46.8492H39.1694C41.7261 46.8492 43.871 44.7872 43.871 42.1476L43.8704 21.9403C43.8704 19.3831 41.8084 17.3211 39.2517 17.3211L39.2519 17.3207Z"
                  fill="#D9D9D9"
                />
              </svg>

              {!selectedCommunityImg && (
                <p className="pt-1 text-sm tracking-wider group-hover:text-gray-600">Load photo</p>
              )}
            </div>
            <input type="file" className="opacity-0" onChange={onSelectCommunityImage} />
            {selectedCommunityImg && (
              <Image
                style={{ objectFit: 'cover' }}
                src={previewCommunityImg!}
                className="w-full h-full absolute rounded-full"
                width={100}
                height={100}
                alt="image"
              />
            )}
          </label>

          <div className="flex-initial text-left">
            <h1 className="text-[20px] leading-10 tracking-[0.04em] font-extrabold font-grotesk mb-[10px]">
              Create your community
            </h1>

            <div className="flex items-center justify-between space-x-[20px] my-[10px]">
              <div className="flex-none text-[16px] font-bold">type in the name:</div>
              <div className="flex-initial">
                <input
                  className="bg-[#F5F5F5] rounded-full w-full py-[8px] px-[20px]"
                  placeholder="add text"
                  value={communityName}
                  onChange={(e) => setcommunityName(e?.target?.value)}
                />
              </div>
            </div>

            <div className="flex justify-between my-[10px]">
              <div className="flex-none text-[16px] font-bold">description:</div>
              <div className="flex-initial">
                <textarea
                  className="bg-[#F5F5F5] rounded-[10px] w-full py-[5px] px-[15px]"
                  rows={3}
                  value={communitydescription}
                  onChange={(e) => setcommunitydescription(e?.target?.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-[10px]" />
        <p className="self-center">{message}</p>
        {accountId ? (
          <button
            className="bg-[#3D3D3D] border-[#3D3D3D] hover:bg-transparent hover:text-[#3D3D3D] border-[1px] text-white rounded-full px-[20px] py-[5px] mt-[20px] self-center"
            onClick={() => handleCreateCommunity()}
            disabled={isProcessing}
          >
            Create community
          </button>
        ) : (
          <h1 className="text-[16px] text-[#3D3D3D] font-normal font-grotesk leading-[40px] trancking-[0.04em]">
            You are not authorized. Please{' '}
            <span
              className="text-[#FB40FF] underline cursor-pointer"
              onClick={() => {
                /*handleSignIn*/
              }}
            >
              sign in
            </span>
          </h1>
        )}
      </div>
    </div>
  );
});

export default CreateCommunity;
