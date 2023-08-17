import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import NotAuthorizedBlock from '../../components/not-authorized';

import CreateNewEvent from '../../features/event-form';
import PageLayout from '../../components/page-layout';
import { useEffect, useState } from 'react';

const NewEventPage: NextPage = () => {
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [address]);

  if (!isConnected) {
    return (
      <div className="flex justify-center min-h-screen items-center p-[20px]">
        <Head>
          <title>Create Your NFT Collection vSelf</title>
          <meta name="description" content="Create Your NFT Collection vSelf" key="desc" />
          <meta property="og:url" content={URL} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta property="og:title" content="Create Your NFT Collection vSelf" />
          <meta property="og:description" content="Create Your NFT Collection vSelf" />
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
    <PageLayout
      title="Create Your NFT Collection"
      category="Products"
      description="Create Your NFT Collection"
    >
      <CreateNewEvent />
    </PageLayout>
  );
};

export default NewEventPage;
