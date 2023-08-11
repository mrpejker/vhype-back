import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AcademyPage: NextPage = () => {
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  return (
    <div className="flex justify-center min-h-screen items-center text-white">
      <Head>
        <title>vSelf Academy</title>
        <meta name="description" content="vSelf Academy" key="desc" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="vSelf Academy" />
        <meta property="og:description" content="vSelf Academy" />
        <meta property="og:image" content={origin + '/ninja2.png'} />
      </Head>
      <p>This section is under development. Stay tuned!</p>
    </div>
  );
};

export default AcademyPage;
