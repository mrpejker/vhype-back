import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const DocsPage: NextPage = () => {
  const { asPath } = useRouter();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`;
  return (
    <div className="flex justify-center min-h-screen items-center text-white">
      <Head>
        <title>vSelf Docs</title>
        <meta name="description" content="vSelf Docs" key="desc" />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:title" content="vSelf Docs" />
        <meta property="og:description" content="vSelf Docs" />
        <meta property="og:image" content={origin + '/ninja2.png'} />
      </Head>
      <p>Coming Soon</p>
    </div>
  );
};

export default DocsPage;
