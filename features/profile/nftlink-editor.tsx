/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { getState } from '../../utils/near';
import { isEnvProd, isStringEmpty } from '../../utils';
import Loader from '../../components/loader';
import { mainContractName } from '../../utils/contract-methods';
import NFTReward from './nft-reward';
import { LinkData, NFTRewardData } from '../../models/vRanda';

interface NFTLinkEditorProps {
  submitLink: (link: LinkData) => void;
  linkToEdit?: LinkData;
  nearid?: string;
}

const emptyLink: LinkData = {
  title: '',
  url: '',
  meta: undefined,
};

const NFTLinkEditor: React.FC<NFTLinkEditorProps> = ({ submitLink, linkToEdit = emptyLink, nearid }) => {
  const [link, setLink] = useState<LinkData>(linkToEdit);
  const [nfts, setNfts] = useState<NFTRewardData[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { url } = link;

  // Fetching contract data to get rewards
  const getUrlMeta = useCallback(
    async (value: string) => {
      try {
        setErrorMsg(null);

        let rewards: NFTRewardData[];
        let contractName: string;

        try {
          contractName = value;
          rewards = await getState(contractName, String(nearid));
        } catch (err) {
          const url = new URL(value);
          contractName = url.pathname.replace('/accounts/', '');
          rewards = await getState(contractName, String(nearid));
        }

        setNfts(rewards);
        setLink({
          ...link,
          title: contractName,
          meta: {
            contract_name: contractName,
            icon: '/nfticon.png',
          },
          url: value,
        });
      } catch (err) {
        console.log(err);
        setNfts([]);
        setLink({ ...link, title: value, url: value });
        setErrorMsg('It seems we cannot get your contract address');
      }
      setIsLoading(false);
    },
    [link, nearid]
  );

  // Debounce function to avoid multiple requests
  const debounceFn = useCallback(debounce(getUrlMeta, 1000), []);

  // Handle input change
  const handleLinkChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setIsLoading(true);
    setLink({ ...link, url: value });
    debounceFn(value);
  };

  const submitLinkChanges = (): void => {
    try {
      debounceFn.cancel();

      if (isStringEmpty(String(link.url))) {
        return;
      }

      if (isStringEmpty(String(link.title))) {
        submitLink({ ...link, title: link.url });
        return;
      }

      if (nfts?.length === 0) {
        setErrorMsg('It seems you have no NFTs');
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
        return;
      }

      submitLink(link);
    } catch (err) {
      setErrorMsg('It seems link already exists');
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  };

  const network = isEnvProd ? 'mainnet' : 'testnet';

  const setDefaultContractName = () => {
    setLink({ ...link, url: mainContractName });
    setIsLoading(true);
    debounceFn(mainContractName);
  };

  return (
    <div className="flex flex-col sm:min-w-[400px] text-left break-all text-[#3D3D3D]">
      <p className="font-drukMedium uppercase text-black mb-4 break-normal">
        Provide contract address to get your nfts
      </p>
      <p className="font-inter text-black mb-4">
        e.g.{' '}
        <span onClick={setDefaultContractName} className="underline hover:no-underline cursor-pointer">
          https://rpc.{network}.near.org/accounts/{mainContractName}
        </span>
      </p>
      <p className="font-inter text-black mb-4">
        or just contract name e.g.{' '}
        <span onClick={setDefaultContractName} className="underline hover:no-underline cursor-pointer">
          {mainContractName}
        </span>
      </p>
      <input
        autoComplete="off"
        placeholder="Link"
        name="newlink"
        onChange={handleLinkChange}
        value={String(url)}
        type="text"
        className={`outline-none form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid ${
          errorMsg ? 'border-red-600' : 'border-gray-300'
        } rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
      />
      {errorMsg && <p className="text-red-600 my-4">{String(errorMsg)}</p>}

      <div className="flex items-center justify-center overflow-y-scroll mt-[20px] max-h-[320px] border-[2px] border-[#e2e2e2] border-dashed p-[15px] rounded-[20px]">
        <Loader is_load={isLoading}>
          {nfts.length === 0 ? (
            <div className="flex my-[20%] text-[#e2e2e2]">Preview</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-wrap">
              {Array.from(nfts).map(({ metadata = { media: '', description: '', title: '' } }, index) => {
                return <NFTReward {...metadata} key={index} />;
              })}
            </div>
          )}
        </Loader>
      </div>
      <button
        type="button"
        onClick={submitLinkChanges}
        className="mt-4 self-end px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </div>
  );
};

export default NFTLinkEditor;
