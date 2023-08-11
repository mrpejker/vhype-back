/* eslint-disable no-prototype-builtins */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, useRef, RefObject } from 'react';
import { useRouter } from 'next/router';
import { navMenuItems } from './header-menu';
import ActiveLink from '../active-link';
import SocialLinks from './social-links';
import HeaderSettingsButton from './settings-button';
import NavButtons from './nav-buttons';
import BurgerMenuIcon from '../icons/BurgerMenuIcon';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import DropdownMenu, { MenuType } from './dropdown-menu';
import { socialContractName, socialContractMethods } from '../../utils/contract-methods';
import { getConnectedContract } from '../../utils/contract';

const Header: React.FC = () => {
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
  // Handling Auth Flow
  const { selector, modal, accountId } = useWalletSelector();
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleSignIn = async () => {
    modal.show();
    setTimeout(() => {
      const middleBtn: HTMLButtonElement | null = document.querySelector('.middleButton');
      if (middleBtn) {
        middleBtn.onclick = () => {
          modal.hide();
          router.push('/onboard');
        };
      }
    }, 0);
  };

  const handleSignOut = useCallback(async () => {
    setActiveMenu({ title: '', type: '' });
    setOpen(false);
    const wallet = await selector.wallet();

    wallet.signOut().catch((err: Error) => {
      console.log('Failed to sign out');
      console.error(err);
    });
  }, [selector]);

  useEffect(() => {
    try {
      const updateAvatar = async () => {
        try {
          // Get data using contract call
          const { contract } = await getConnectedContract(socialContractName, socialContractMethods);
          const result = await contract.get({ keys: [`${accountId}/vself/**`] });
          if (!result.hasOwnProperty(accountId)) {
            throw 'Undefined';
          }
          // Update avatar url
          if (result && result[`${accountId}`].vself.avatar_url) {
            const avatar_url = result[`${accountId}`].vself.avatar_url;
            setAvatar(avatar_url);
          }
        } catch (err) {
          console.log('Error fetching data: ', err);
        }
      };

      // Update avatar if accountId exists
      accountId && updateAvatar();
    } catch (err) {
      console.log(err);
    }
  }, [accountId]);

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

  const toggleSettingsMenu = () => {
    if (!accountId) {
      handleSignIn();
      return;
    }
    if (open && activeMenu.type !== MenuType.Settings) {
      setActiveMenu({ title: '', type: MenuType.Settings });
      return;
    }
    setOpen(!open);
    setActiveMenu({ title: '', type: MenuType.Settings });
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
            avatar={avatar}
            accountId={accountId}
            isColored={isAbout}
            toggleSettings={toggleSettingsMenu}
          />
          <button type="button" onClick={toggleBurgerMenu} className="items-center sm:hidden ml-3">
            <BurgerMenuIcon className="fill-white" />
          </button>
        </div>
      </nav>
      <DropdownMenu
        isOpened={open}
        isAbout={isAbout}
        accountId={accountId}
        openSubmenu={openSubmenu}
        handleSignOut={handleSignOut}
        activemenu={activeMenu}
      />
    </header>
  );
};

export default Header;
