/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'; // useState
import IpfsImage from '../../components/ipfsImage';

type NFTRewardProps = {
  media: string | undefined;
  description: string | undefined;
  title: string | undefined;
};

const cutString = (text: string, length: number) => {
  if (text.length <= length + 3) return text;
  return text.slice(0, length) + '...';
};

const NFTReward: React.FC<NFTRewardProps> = ({ media = undefined, description = undefined, title = undefined }) => {
  // Need to store screen width to cut a text correctly
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // TO DO move this logic to the nft-list.tsx
  useEffect(() => {
    const updateDimension = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenWidth]);

  const cutDescription = (description: string) => {
    if (screenWidth > 1280) {
      return cutString(description, 65);
    }
    if (screenWidth > 768) {
      return cutString(description, 90);
    }
    return cutString(description, 120);
  };

  // const [isImageLoaded, setIsImageLoaded] = useState(false);

  // const handleImageLoad = () => {
  //   setIsImageLoaded(true);
  // };
  return (
    <div className="flex flex-row h-[146px] min-w-[300px] rounded-[20px] bg-[#FFFFFF] shadow-[0px_0px_15px_0px_#0000001a]">
      <div className="flex w-[144px] h-[144px] justify-center items-center ml-[10px]">
        {/* {!isImageLoaded && <div className="animate-skeleton pulse w-full pt-[100%] rounded-[10px]" />} */}
        <IpfsImage
          src={String(media)}
          alt={description}
          style={{ width: '100px', height: '100px' }}
          //style={{ display: isImageLoaded ? 'block' : 'none', width: '100%', height: 'auto' }}
        />
      </div>
      <div className="flex flex-col justify-center mx-[10px]">
        {title !== undefined ? (
          <p className="font-inter font-bold text-[16px] text-[#3D3D3D]">{title}</p>
        ) : (
          <div className="w-full h-[20px] animate-skeleton pulse px-[20px] py-[10px] mb-2" />
        )}
        {description !== undefined ? (
          <p className="font-inter text-[14px] text-[#3D3D3D] font-normal leading-[18px]">
            {cutDescription(description)}
          </p>
        ) : (
          <div className="w-full h-[20px] animate-skeleton pulse px-[20px] py-[20px]" />
        )}
      </div>
    </div>
  );
};

export default NFTReward;
