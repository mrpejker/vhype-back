/* eslint-disable no-prototype-builtins */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, useRef, RefObject } from 'react';
import { useRouter } from 'next/router';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';
import { navMenuItems } from './header-menu';
import ActiveLink from '../active-link';
import SocialLinks from './social-links';
import HeaderSettingsButton from './settings-button';
import NavButtons from './nav-buttons';
import BurgerMenuIcon from '../icons/BurgerMenuIcon';
import DropdownMenu, { MenuType } from './dropdown-menu';

const Header: React.FC = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open: openWalletConnectModal } = useWeb3Modal();

  // Dropdown
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<{ title: string; type: string }>({ title: '', type: '' });
  const router = useRouter();
  const isAbout =
    router.pathname === '/about' ||
    router.pathname.includes('/blog') ||
    router.pathname === '/blog' ||
    router.pathname.includes('/faq') ||
    router.pathname == '/faq' ||
    router.pathname.includes('/vranda') ||
    router.pathname === '/vranda';

  const headerRef: RefObject<HTMLInputElement> = useRef(null);

  const handleSignOut = useCallback(async () => {
    if (isConnected) {
      disconnect();
    }
  }, [isConnected]);

  // Dropdown Menu Handling
  // Place Header Background While Scrolling
  // Detect Scroll Event and setting state
  useEffect(() => {
    const onScroll = (e: Event) => {
      if (typeof window !== undefined) {
        const win = e.currentTarget as Window;
        const currentPosition = win.scrollY;
        currentPosition > 10 ? setScrolling(true) : setScrolling(false);
      }
    };
    typeof window !== undefined && window.addEventListener('scroll', onScroll);

    return () => {
      typeof window !== undefined && window.removeEventListener('scroll', onScroll);
    };
  }, [scrolling]);

  // Close Dropdown When Clicked Outside Header
  useEffect(() => {
    function handleClickOutside(event: Event) {
      const targetNode = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(targetNode)) {
        setActiveMenu({ title: '', type: '' });
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [headerRef]);

  // Close Everything When Route Changes
  useEffect(() => {
    setActiveMenu({ title: '', type: '' });
    setOpen(false);
  }, [router.pathname]);

  const openSubmenu = (title: string) => {
    if (activeMenu.title === title && open) {
      setActiveMenu({ title: '', type: '' });
      setOpen(false);
      return;
    }
    setActiveMenu({ title, type: MenuType.Submenu });
    setOpen(true);
  };

  const toggleBurgerMenu = () => {
    setActiveMenu({ title: '', type: MenuType.Main });
    setOpen(!open);
  };

  // Prepareing CSS Styles
  const logoClassName = 'font-grotesk text-[25px] ' + (isAbout ? 'text-[#343434]' : 'text-[#41F092]');
  let navClassName = 'flex flex-col fixed top-0 z-50 py-4 w-full items-center transition-colors duration-500  ';
  navClassName += isAbout ? 'text-black' : 'text-white';
  if (scrolling || open) {
    navClassName += isAbout ? ' bg-[#ffffff] ' : ' bg-[#000000f0]';
    if (activeMenu.title !== '') {
      navClassName += isAbout ? '  ' : ' text-[#ffffff61]';
    }
  }

  return (
    <header className={navClassName} ref={headerRef}>
      <nav className="flex justify-between flex-row w-full max-w-[1240px] px-[20px] mx-auto items-center">
        <ActiveLink href="/">
          <h2 className={logoClassName}>vSelf</h2>
        </ActiveLink>
        <NavButtons
          activeMenu={activeMenu.title}
          isAbout={isAbout}
          callback={openSubmenu}
          menuItems={navMenuItems}
          className="sm:flex flex-row hidden grow justify-evenly max-w-[600px]"
        />
        <div className="flex flex-row md:grow max-w-[250px] items-center">
          <SocialLinks isColored={isAbout} />
          <HeaderSettingsButton
            isColored={isAbout}
            toggleSettings={openWalletConnectModal}
          />
          <button type="button" onClick={toggleBurgerMenu} className="items-center sm:hidden ml-3">
            <BurgerMenuIcon className="fill-white" />
          </button>
        </div>
      </nav>
      <DropdownMenu
        isOpened={open}
        isAbout={isAbout}
        address={address}
        openSubmenu={openSubmenu}
        handleSignOut={handleSignOut}
        activemenu={activeMenu}
      />
    </header>
  );
};

export default Header;
