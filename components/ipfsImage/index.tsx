/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

interface IpfsImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const IpfsImage: React.FC<IpfsImageProps> = ({ src, alt, className, style }) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // If image uri is in public folder, use it directly
    let prefix = src.slice(0, 1);
    if (prefix === '/') {
      setImageSrc(src);
      return;
    }

    // Check that the image uri is an ipfs uri or a http/https uri
    prefix = src.slice(0, 4);
    if (prefix === 'http') {
      setImageSrc(src);
    } else {
      const ipfsUrl = `https://ipfs.io/ipfs/${src}`;
      setImageSrc(ipfsUrl);
    }
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = 'https://wallet.testnet.near.org/failed_to_load.3a5f0340.svg';
      }}
    />
  );
};

export default IpfsImage;
