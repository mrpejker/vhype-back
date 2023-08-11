/* eslint-disable react-hooks/rules-of-hooks */
import { GetServerSidePropsContext, NextPage } from 'next';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import Toast from '../../components/toast';
import NFTReward from '../../features/profile/nft-reward';
import { downloadQR } from '../../utils';
import { mainContractName } from '../../utils/contract-methods';
import { getState } from '../../utils/near';

interface NFTProps {
  metadata: {
    media: string;
    description: string;
    title: string;
  };
}

interface vSelfNFTSPageProps {
  eventid: string;
  nearid: string;
  nfts: NFTProps[];
  qrString: string;
}

const vSelfNFTSPage: NextPage<vSelfNFTSPageProps> = ({ nfts = [], nearid = '' }) => {
  const [toastShown, setToastShown] = useState<boolean>(false);

  const copyToClipBoard = async () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const link = `/vselfnfts/${nearid}`;
    navigator.clipboard.writeText(origin + link);
    setToastShown(true);
    setTimeout(() => {
      setToastShown(false);
    }, 1500);
  };
  const download = () => downloadQR(String(nearid));
  return (
    <main className="flex flex-col justify-center items-center pt-[125px] mx-[10px]">
      <Toast isShown={toastShown} message="Link Saved" />
      <div className="flex grow justify-center w-full">
        <div className="flex grow gap-4 flex-col-reverse md:justify-between md:flex-row w-full max-w-[1280px] mb-[40px] relative z-10">
          <section className="flex flex-col  md:basis-1/3 bg-[#019FFF] rounded-[20px]">
            <div className="flex flex-col mb-[20px] p-[40px]">
              <h2 className="font-grotesk text-[32px] uppercase md:mb-4 text-[#FFFFFF]">QR Code</h2>
              <div className="flex self-center bg-white rounded-[20px] p-[10px]">
                <QRCode id="qrcode" value={String(nearid)} />
              </div>
              <button
                onClick={download}
                type="button"
                className="w-full mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#57BFFF] text-white hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Download
              </button>
              <button
                onClick={copyToClipBoard}
                type="button"
                className="w-full mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#57BFFF] text-white hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Copy Link
              </button>
            </div>
          </section>
          <section className="flex md:basis-2/3 flex-col bg-white rounded-[20px]">
            <div className="flex flex-col md:flex-row md:justify-between pt-[40px] px-[40px] pb-4">
              <h2 className="font-grotesk text-[#3D3D3D] text-[32px] uppercase mb-0">Rewards</h2>
            </div>
            <div className="flex flex-col pb-[40px]">
              <div className="sm:grid sm:grid-cols-1 sm:grid-rows-[266px] md:mb-[30px] px-[40px]">
                {nfts.length > 0
                  ? Array.from(nfts).map(({ metadata = { media: '', description: '', title: '' } }, index) => {
                      return <NFTReward {...metadata} key={index} />;
                    })
                  : Array.from(
                      Array(4).fill({ metadata: { media: undefined, description: undefined, title: undefined } })
                    ).map(({ metadata }: any, index) => {
                      return <NFTReward {...metadata} key={index} />;
                    })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export const getServerSideProps = async ({ query, res }: GetServerSidePropsContext) => {
  const { slug } = query;
  const rewards = await getState(mainContractName, String(slug));
  return {
    props: {
      nearid: slug,
      nfts: rewards,
    },
  };
};

export default vSelfNFTSPage;
