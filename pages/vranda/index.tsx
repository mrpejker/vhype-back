/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import type { NextPage } from 'next';
import ProfileComponent from '../../features/profile';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import NotAuthorizedBlock from '../../components/not-authorized';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ProfilePage: NextPage = () => {
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  const { accountId } = useWalletSelector();

  if (!accountId) {
    return (
      <div className="flex justify-center min-h-screen items-center p-[20px]">
        <Head>
          <title>vRanda</title>
          <meta name="description" content="Your profile in web3" key="desc" />
          <meta property="og:url" content={URL} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta property="og:title" content="vRanda web3 profile" />
          <meta property="og:description" content="Your profile in web3" />
          <meta property="og:image" content={origin + '/ninja2.png'} />
        </Head>
        <div className="w-full max-w-[1240px] px-[20px] py-[40px] bg-white rounded-xl">
          <div className="w-full max-w-[1080px] mx-auto">
            <NotAuthorizedBlock />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center pt-[100px]">
      <Head>
        <title>vRanda</title>
        <meta name="description" content="Your profile in web3" key="desc" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="vRanda web3 profile" />
        <meta property="og:description" content="Your profile in web3" />
        <meta property="og:image" content={origin + '/ninja2.png'} />
      </Head>
      <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
        <span className="text-[#B1B1B1] font-inter text-[16px] font-normal leading-[26px]">
          <Link href="/" className="underline">
            Main
          </Link>{' '}
          / Products / vRanda
        </span>
      </div>
      <ProfileComponent nearid={accountId} isEditing={true} />
    </main>
  );
};

export default ProfilePage;
