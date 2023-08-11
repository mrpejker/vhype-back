/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import LinkIconComponent from '../../components/link-icon';
import { LinkMetaData, NFTMetaData } from '../../models/vRanda';
import { checkFavIcon, checkIsUrlContract, validateUrl } from './utils';

interface LinkPreviewProps {
  url: string;
  meta?: LinkMetaData | NFTMetaData;
  title?: string;
  className?: string;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, meta, title, className = '' }) => {
  const [isLinkLoaded, setIsLinkLoaded] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  const [icon, setIcon] = useState<string | null>('');

  useEffect(() => {
    const initLink = async () => {
      const checkedUrl = await checkIsUrlContract(url);
      const validatedUrl = validateUrl(checkedUrl);
      const icon = await checkFavIcon(validatedUrl);
      setLink(validatedUrl);
      const defaultIcon = '';
      setIcon(meta ? meta.icon : icon || defaultIcon);
    };
    initLink()
      .then(() => {
        setIsLinkLoaded(true);
      })
      .catch(() => {
        setIsLinkLoaded(true);
      });
  }, [meta, url]);

  return !isLinkLoaded ? (
    <div className="pulse max-w-[320px] w-full relative z-0 my-2 px-[20px] py-[20px] h-[55px] rounded-full" />
  ) : (
    <div
      className={
        className +
        ' flex flex-row items-center rounded-full relative z-0 my-2 px-[20px] py-[8px] border-white border-[2px] hover:border-[#D9D9D9] transition-colors ease-in text-[#000] overflow-auto'
      }
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-row w-full items-center">
        <LinkIconComponent icon={icon} />
        <span className="font-inter text-[12px] text-[#3D3D3D] overflow-hidden max-w-[250px] whitespace-nowrap underline mx-[12px] cursor-pointer">
          {title}
        </span>
      </a>
    </div>
  );
};

export default LinkPreview;
