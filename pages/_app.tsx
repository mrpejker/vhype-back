/* eslint-disable no-empty-pattern */
import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@near-wallet-selector/modal-ui/styles.css';
import type {
  AppProps,
  // NextWebVitalsMetric
} from 'next/app';
import App, { AppContext } from 'next/app';
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';

import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';

import { WalletSelectorContextProvider } from '../contexts/WalletSelectorContext';

import { appWithTranslation } from 'next-i18next';
import Header from '../components/header';
import Footer from '../components/footer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { defaultChain, ethereumClient, projectId, wagmiConfig } from '../utils/wagmi';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const setPageBackground = () => {
      switch (router.pathname) {
        case '/':
        case '/404':
          return 'bg-[#343434]';
        case '/about':
        case router.pathname.includes('/blog') && router.pathname:
          return 'bg-[#F5F5F5]';
        case router.pathname.includes('/faq') && router.pathname:
          return 'bg-white';
        case router.pathname.includes('/vranda') && router.pathname:
          return 'bg-[#F9FAFF]';
        default:
          return 'bg-[url(/mission_bg.png)] bg-cover bg-center';
      }
    };
    document.body.className = setPageBackground();
  }, [router.pathname]);

  try {
    return (
      <>
        <WagmiConfig config={wagmiConfig}>
          <WalletSelectorContextProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </WalletSelectorContextProvider>
        </WagmiConfig>

        <Web3Modal
          themeMode='light'
          projectId={projectId}
          ethereumClient={ethereumClient}
          defaultChain={defaultChain}
          chainImages={{
            '500': '/cam-token.svg',
            '501': '/cam-token.svg'
          }}
          tokenImages={{
            'CAM': '/cam-token.svg',
          }}
        />
      </>
    );
  } catch (err) {
    console.log(err);
    return <></>;
  }
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  return { ...appProps };
};

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log('metric: ', metric);
// }

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      ctx,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(appWithTranslation(MyApp));
