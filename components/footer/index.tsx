/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import ActiveLink from '../active-link';
import SocialLinks from '../header/social-links';

const Footer: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [address]);

  const handleAuth = async () => {
    if (!isConnected) {
      open();
    } else {
      disconnect();
    }
  };

  const isLanding = router.pathname === '/';
  const isAbout =
    router.pathname === '/about' ||
    router.pathname.includes('/blog') ||
    router.pathname === '/blog' ||
    router.pathname.includes('/faq') ||
    router.pathname == '/faq' ||
    router.pathname.includes('/vranda') ||
    router.pathname == '/vranda';

  const renderFooterBackground = () => {
    switch (router.pathname) {
      case '/':
      case '/contact':
      case '/404':
        return 'bg-transparent text-white';
      case '/about':
      case router.pathname.includes('/vranda') && router.pathname:
      case router.pathname.includes('/blog') && router.pathname:
      case router.pathname.includes('/faq') && router.pathname:
        return 'bg-transparent text-black';
      default:
        return 'bg-[#00000066]';
    }
  };
  const signInBtnClassName = isAbout
    ? 'bg-[#FB40FF] text-white hover:text-[#FB40FF] hover:border-[#FB40FF]'
    : 'bg-[#41F092] text-black hover:text-[#41F092] hover:border-[#41F092]';
  return (
    <footer className={renderFooterBackground() + ' flex flex-col'}>
      <div className="flex flex-col md:flex-row w-full max-w-[1240px] mx-auto self-center justify-between items-baseline px-[20px]">
        <div className="flex flex-col w-full md:flex-row md:w-2/3">
          <div className="w-full md:w-1/3">
            <ActiveLink href="/">
              <h2 className={` ${isAbout ? 'text-[#343434]' : 'text-[#41F092]'} font-grotesk text-[25px]`}>vSelf</h2>
            </ActiveLink>
          </div>
          <div className="flex w-full flex-col md:flex-row md:w-1/2 mt-[20px] md:mt-0">
            <div className="flex w-full flex-col md:w-2/3">
              <h2 className={isAbout ? 'text-[#343434]' : 'text-[#41F092]'}>
                <b>Products</b>
              </h2>
              <ActiveLink href="/onboard" className="mt-2">
                <p className={isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white'}>
                  Onboarding to NEAR
                </p>
              </ActiveLink>
              <ActiveLink href="/dashboard" className="mt-2">
                <p className={isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white'}>
                  Collections dashboard
                </p>
              </ActiveLink>

              <ActiveLink href="/add" className="mt-2">
                <p className={isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white'}>
                  Create Collection
                </p>
              </ActiveLink>
              <ActiveLink href="/vranda" className="mt-2">
                <p className={isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white'}>vRanda</p>
              </ActiveLink>
              <ActiveLink href="/vstudio" className="mt-2">
                <p className={isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white'}>
                  vStudio
                </p>
              </ActiveLink>
            </div>
            <div className="flex w-full flex-col md:w-1/2 mt-[20px] md:mt-0">
              <h2 className={isAbout ? 'text-[#343434]' : 'text-[#41F092]'}>
                <b>Resources</b>
              </h2>
              <ActiveLink href="/faq" className="mt-2">
                <p className={isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white'}>FAQ</p>
              </ActiveLink>
              <ActiveLink href="/academy" className="mt-2">
                <p className={(isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white') + ' '}>
                  vSelf Academy
                </p>
              </ActiveLink>
              <ActiveLink href="https://vself-project.gitbook.io/vself-project-documentation/" className="mt-2">
                <p className={(isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white') + ' '}>
                  Documents
                </p>
              </ActiveLink>
              <ActiveLink href="/blog" className="mt-2">
                <p className={(isAbout ? 'hover:font-semibold text-black' : 'hover:text-[#41F092] text-white') + ' '}>
                  Blog
                </p>
              </ActiveLink>
            </div>
          </div>
        </div>{' '}
        <div className="flex flex-col mt-[20px] md:items-end w-full md:w-1/3">
          <div className="flex grow w-full max-w-[250px] flex-row items-center">
            <SocialLinks isColored={isAbout} />
            <button
              type="button"
              onClick={handleAuth}
              className={
                'flex justify-center items-center px-[10px] cursor-pointer transition-colors rounded-full border-[1px] sm:inline-block border-transparent min-w-[75px] hover:bg-transparent ' +
                'bg-[#41F092] text-black hover:border-[#41F092]'
              }
            >
              {isConnected ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1240px] mx-auto px-[20px] text-center mt-8">
        <p className="font-DrukMedium text-white">&copy; VSELF PTE. LTD {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
