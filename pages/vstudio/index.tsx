/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

const Home: NextPage = memo(() => {
  const router = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const metaURL = `${origin}${router.asPath}`;
  const handleNavigate = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined, path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[120px] pb-[80px]">
      <Head>
        <title>vStudio</title>
        <meta
          name="description"
          content="Revolutionize the way web3 onboarding create private communities where the governance method is a choice"
          key="desc"
        />
        <meta property="og:url" content={metaURL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="vStudio" />
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
          / Products / <b className="text-[#fff]">vStudio</b>
        </span>
      </div>
      <div className="w-full mb-[65px] flex flex-col items-center">
        <h1 className="font-grotesk text-[40px] md:text-[80px] font-extrabold text-white">vStudio</h1>
        <div className="font-grotesk text-[18px] md:text-[20px] text-center font-extrabold text-white">
          When privacy comes first
        </div>
        <div className="max-w-[500px] text-[18px] md:text-[20px] font-normal font-inter text-white text-center m-[10px]">
          Revolutionize the way web3 onboarding create private communities where the governance method is a choice
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center py-[50px]">
        <div
          className="min-w-[200px] md:min-w-[400px] flex flex-row items-center mx-[10px] mb-[20px] p-[40px] rounded-[17px] bg-[#41F092] cursor-pointer hover:opacity-[0.65] active:opacity-[0.85] active:translate-y-[1px]"
          onClick={(e) => handleNavigate(e, '/vstudio/communities')}
        >
          <div>
            <h1 className="text-[20px] text-[#3D3D3D] font-extrabold font-grotesk leading-[22px] uppercase">
              Join
              <br />
              community
            </h1>
            <div className="text-[16px] text-[#3D3D3D] font-normal font-inter leading-[22px] mt-2">
              Become a part of the DAO’s on your terms
            </div>
          </div>
        </div>

        <div>
          <div
            className="min-w-[200px] md:min-w-[400px] flex flex-row items-center mx-[10px] mb-[20px] p-[40px] rounded-[17px] bg-[#41F092] cursor-pointer hover:opacity-[0.65] active:opacity-[0.85] active:translate-y-[1px]"
            onClick={(e) => handleNavigate(e, 'vstudio/create')}
          >
            <div>
              <h1 className="text-[20px] text-[#3D3D3D] font-extrabold font-grotesk leading-[22px] uppercase">
                Create
                <br />
                community
              </h1>
              <div className="text-[16px] text-[#3D3D3D] font-normal font-inter leading-[22px] mt-2">
                Start writing your Web3 story
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;
