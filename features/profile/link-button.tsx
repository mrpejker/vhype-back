/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState, memo } from 'react';
import LinkIconComponent from '../../components/link-icon';
import RemoveIcon2 from '../../components/icons/RemoveIcon2';
import { checkFavIcon } from './utils';
import { LinkMetaData, NFTMetaData } from '../../models/vRanda';

interface LinkButtonProps {
  title: string;
  meta: LinkMetaData | NFTMetaData | undefined;
  linkKey: string;
  btnCallback?: (key: string) => void;
  rmvCallback?: (key: string) => void;
  url: string;
  url_prefix?: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = memo(
  ({ title, linkKey, meta, btnCallback = () => {}, rmvCallback = () => {}, url, url_prefix = '', className = '' }) => {
    const [isLinkLoaded, setLinkLoaded] = useState(false);
    const [favicon, setFavIcon] = useState(meta?.icon);

    useEffect(() => {
      const getFavicon = async () => {
        try {
          const icon = await checkFavIcon(url);
          setFavIcon(meta?.icon ?? icon);
          setLinkLoaded(true);
        } catch (error) {
          setLinkLoaded(true);
        }
      };
      getFavicon();
    }, [url, meta, setFavIcon]);

    const linkCallback = () => {
      btnCallback(linkKey);
    };

    const removeLink = () => {
      rmvCallback(linkKey);
    };

    const openLink = () => {
      if (window !== null) {
        const newWindow = window?.open(url_prefix + url, '_blank');
        if (newWindow !== null) newWindow.focus();
      }
    };

    return !isLinkLoaded ? (
      <div className="pulse max-w-[320px] w-full relative z-0 my-2 px-[20px] py-[8px] h-[55px] rounded-full" />
    ) : (
      <div
        role="listitem"
        className={
          className +
          ' flex flex-row items-center rounded-full relative z-0 my-2 px-[20px] py-[8px] border-white border-[2px] hover:border-[#D9D9D9] transition-colors ease-in text-[#000] overflow-auto'
        }
      >
        <button type="button" name="mainLink" className="flex flex-row w-full items-center" onClick={linkCallback}>
          <LinkIconComponent icon={favicon} />
          <span
            className="font-inter text-[12px] text-[#3D3D3D] overflow-hidden max-w-[250px] whitespace-nowrap underline mx-[12px] cursor-pointer"
            onClick={openLink}
          >
            {title}
          </span>
        </button>
        <button type="button" className=" z-100 hover:text-[#c66969db]" onClick={removeLink}>
          <RemoveIcon2 className={'w-[13px] h-[13px] stroke-[#3D3D3D]'} />
        </button>
      </div>
    );
  }
);

export default LinkButton;
