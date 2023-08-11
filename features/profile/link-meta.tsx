/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Loader from '../../components/loader';

interface LinkMetaProps {
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  loading?: boolean;
}

const LinkMeta: React.FC<LinkMetaProps> = ({
  icon = '',
  title = undefined,
  description = '',
  image = '',
  loading = false,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="flex justify-center items-center border-[2px] mt-[20px] border-[#e2e2e2] border-dashed p-[15px] rounded-[20px]">
      <Loader is_load={loading}>
        {title === undefined ? (
          <div className="flex my-[20%] text-[#e2e2e2]">Preview</div>
        ) : (
          <div className="flex flex-col ">
            <div className="flex flex-row my-2 gap-[20px]">
              <img
                style={{ maxWidth: 30 }}
                alt=""
                src={icon === null ? undefined : icon}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
                }}
              />

              <span>{title}</span>
            </div>
            <div className="flex flex-row justify-between gap-[20px] my-2 relative max-h-[200px] overflow-hidden">
              {!isImageLoaded && (
                <div className="basis-1/3 w-full max-w-[150px] h-[200px] bg-[#F5F5F5] rounded-[10px]" />
              )}
              <img
                src={image === null ? undefined : image}
                alt={description === null ? undefined : description}
                className="basis-1/3 "
                style={{ display: isImageLoaded ? 'block' : 'none', width: '100%', height: 'auto', maxWidth: 150 }}
                onLoad={handleImageLoad}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
                }}
              />
              <p className="my-2 basis-2/3">{description}</p>
            </div>
          </div>
        )}
      </Loader>
    </div>
  );
};

export default LinkMeta;
