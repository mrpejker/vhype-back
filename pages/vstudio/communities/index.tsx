/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { getConnectedContract } from '../../../utils/contract';
import { communitiesContractMethods, communitiesContractName } from '../../../utils/contract-methods';

interface ICommunityInfo {
  community_id: string;
  community_owner: string;
  community_name: string;
  community_description: string;
  community_source_image: any;
  members?: string[];
}

const Communities: NextPage = memo(() => {
  const router = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const metaURL = `${origin}${router.asPath}`;
  const [communities, setCommunities] = useState<ICommunityInfo[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');

  const handleNaviagte = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined, path: string) => {
    e?.preventDefault();
    console.log('path', path);
    router.push(path);
  };

  const initialize = async () => {
    try {
      const { contract } = await getConnectedContract(communitiesContractName, communitiesContractMethods);
      const result = await contract.get_community_list({ from_index: 0, limit: 100 });
      const communities = await Promise.all(
        result.map(async (item: any) => {
          const rowData: ICommunityInfo = {
            community_id: item[0],
            community_owner: item[1]?.community_owner,
            community_name: item[1]?.community_name,
            community_description: item[1]?.community_description,
            community_source_image: item[1]?.community_source_image,
          };

          return rowData;
        })
      );

      setCommunities(communities);
    } catch (e) {
      console.log('error: ', e);
    }
  };

  useEffect(() => {
    (async () => {
      await initialize();
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-[120px] pb-[80px]">
      <Head>
        <title>Find your Community in vStudio</title>
        <meta
          name="description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
          key="desc"
        />
        <meta property="og:url" content={metaURL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="Find your Community in vStudio" />
        <meta
          property="og:description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
        />
        <meta property="og:image" content={origin + '/ninja2.png'} />
      </Head>
      <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
        <span className="text-[#B1B1B1] font-inter">
          <Link href="/" className="underline">
            Main
          </Link>{' '}
          / Products /{' '}
          <Link href="/vstudio" className="underline">
            vStudio
          </Link>{' '}
          / <b className="text-[#fff]">Communties</b>
        </span>
      </div>
      <div className="flex flex-col max-w-[1240px] w-full text-white pt-[120px]">
        <h1 className="font-extrabold mb-[20px] text-[40px] text-center leading-[60px] font-grotesk tracking-[0.04em]">
          Find your community
        </h1>

        <div className="px-5 py-3 grid gap-[30px] grid-cols-1 md:grid-cols-2">
          {communities
            .filter((item) => item.community_name.toLowerCase().includes(searchWord.toLowerCase()))
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className="min-h-[150px] flex items-center baseline p-[10px] rounded-[20px] bg-[#41F092] relative cursor-pointer"
                  onClick={(e) => handleNaviagte(e, `/vstudio/communities/${item.community_id}`)}
                >
                  <div className="flex justify-center md:w-[150px] md:h-[150px] ml-[15px] mr-[10px] items-center">
                    <img
                      src={String(new URL(item.community_source_image))}
                      alt="community_source_image"
                      width={120}
                      height={120}
                    />
                  </div>
                  <div className="text-left">
                    <h1 className="text-[20px] text-[#3D3D3D] tracking-[0.04em] font-extrabold font-grotesk">
                      {item.community_name}
                    </h1>
                    <div className="text-[16px] text-[#3D3D3D] leading-[22px] font-normal font-inter">
                      {item.community_description}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex w-full justify-center items-center gap-[20px] mt-[80px] mb-[20px]">
          <span className="text-[16px]">Type in the name</span>
          <div className="relative max-w-[500px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-4 pr-12 text-white-500 border rounded-full outline-none bg-transparent focus:border-indigo-600"
              onChange={(e) => setSearchWord(e?.target?.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Communities;
