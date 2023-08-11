/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EventsDashboard from '../../features/dashboard';
import { getConnectedContract } from '../../utils/contract';

interface EventsDashboardProps {
  ongoingEvents: any;
}

const EventsDashboardPage: NextPage<EventsDashboardProps> = ({ ongoingEvents = [] }) => {
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  return (
    <main className="flex flex-col sm:justify-center sm:items-center pt-[120px] pb-[80px]">
      <Head>
        <title>vSelf Events Dashboard</title>
        <meta name="description" content="vSelf Events Dashboard" key="desc" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="vSelf Events Dashboard" />
        <meta property="og:description" content="vSelf Events Dashboard" />
        <meta property="og:image" content={origin + '/ninja2.png'} />
      </Head>
      <div className="max-w-[1240px] w-full mb-[30px] px-[20px]">
        <span className="text-[#B1B1B1] font-inter">
          <Link href="/" className="underline">
            Main
          </Link>{' '}
          / Products / <b className="text-[#fff]">Dashboard</b>
        </span>
      </div>
      <EventsDashboard ongoingEvents={ongoingEvents} />
    </main>
  );
};

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  res.setHeader('Cache-Control', 'public, s-maxage=0, stale-while-revalidate=10');
  try {
    const { contract } = await getConnectedContract();
    const ongoingEvents = await contract.get_ongoing_events({ from_index: 0, limit: 100 });
    return {
      props: {
        ongoingEvents,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        ongoingEvents: [],
      },
    };
  }
};

export default EventsDashboardPage;
