/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { NFTMetaData, LinkMetaData } from '../../models/vRanda';
import { getState } from '../../utils/near';
import LinkButton from './link-button';
import LinkPreview from './link-preview';
import NFTReward from './nft-reward';

interface Metadata {
  metadata: {
    media: string;
    description: string;
    title: string;
  };
}

const fetchRewards = async (url: string, nearid: string): Promise<Metadata[]> => {
  try {
    const tokenUrl = new URL(url);
    const contract_name = tokenUrl.pathname.replace('/accounts/', '');
    const rewards = await getState(contract_name, nearid);
    return rewards;
  } catch (err) {
    const rewards = await getState(url, nearid);
    return rewards;
  }
};

const renderRewards = (nftImgs: Metadata[], numRewards: number): JSX.Element[] => {
  return Array.from(
    nftImgs || Array(numRewards).fill({ metadata: { media: undefined, description: undefined, title: undefined } })
  )
    .slice(0, numRewards)
    .map(({ metadata }, index) => {
      return <NFTReward {...metadata} key={index} />;
    });
};

// Note: full URL which opens when link button is pressed is url_prefix + url
interface NFTLinkProps {
  title?: string;
  meta: LinkMetaData | NFTMetaData | undefined;
  linkKey: string;
  isEditing?: boolean;
  nearid?: string;
  url?: string;
  url_prefix?: string;
  rmvCallback?: (key: string) => void;
}

const NftLink: React.FC<NFTLinkProps> = ({
  title = '',
  meta = undefined,
  linkKey,
  isEditing,
  nearid,
  url = '',
  url_prefix = '',
  rmvCallback,
}) => {
  const [nftImgs, setNftImgs] = useState<Metadata[]>([]);

  useEffect(() => {
    const initLink = async () => {
      try {
        const imgs = await fetchRewards(url, String(nearid));
        setNftImgs(imgs);
      } catch (err) {
        setNftImgs([]);
      }
    };
    initLink();
    return () => setNftImgs([]);
  }, [nearid, url]);

  // Skip if url is bad
  if (url === '' || url === null) return null;
  return (
    <div className="flex flex-col" key={linkKey}>
      <div className="flex justify-center md:justify-start md:ml-[40px]">
        {isEditing ? (
          <LinkButton
            linkKey={linkKey}
            title={title}
            url={url}
            url_prefix={url_prefix}
            meta={meta}
            rmvCallback={rmvCallback}
            className="bg-white"
          />
        ) : (
          <LinkPreview url={url} meta={meta} title={title} className="bg-white" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-[20px] gap-4 auto-cols-max my-[40px] px-[40px]">
        {nftImgs.length > 0 ? renderRewards(nftImgs, nftImgs.length) : renderRewards([], 4)}
      </div>
    </div>
  );
};

export default NftLink;
