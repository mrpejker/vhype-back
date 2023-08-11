/* eslint-disable @next/next/no-img-element */
import React from 'react';
import IpfsImage from '../../components/ipfsImage';
import { CollectionData } from '../../models/Event';

interface ClaimsListProps {
  claims: string[];
  qrbtnCallback: (index: number) => void;
  claimBtnCallback: (index: number) => void;
  imgCallback: (index: number) => void;
  event_id: number;
  eventData: CollectionData | undefined;
}

const ClaimsList: React.FC<ClaimsListProps> = ({
  event_id,
  claims,
  qrbtnCallback,
  claimBtnCallback,
  imgCallback,
  eventData,
}) => {
  const getQRCode = (event: React.MouseEvent<HTMLElement>) => {
    const value: number = parseInt((event.currentTarget as HTMLButtonElement).value, 10);
    qrbtnCallback(value);
  };
  const getClaim = (event: React.MouseEvent<HTMLElement>) => {
    const value: number = parseInt((event.currentTarget as HTMLButtonElement).value, 10);
    claimBtnCallback(value);
  };
  const getImg = (event: React.MouseEvent<HTMLElement>) => {
    const value: number = parseInt((event.currentTarget as HTMLButtonElement).value, 10);
    imgCallback(value);
  };
  const copyToClipBoard = (event: React.MouseEvent<HTMLElement>) => {
    const value: number = parseInt((event.target as HTMLButtonElement).value, 10);
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const link = `/claim/${event_id}?strings=${claims[value]}`;
    navigator.clipboard.writeText(origin + link);
  };

  return (
    <table className="text-[#3D3D3D] w-full">
      <tbody>
        {claims.map((string, index) => (
          <tr key={index} className="hover:text-black hover:bg-[#cbd5e173] ">
            <td>{eventData?.quests[index].reward_title}</td>
            <td>{string}</td>
            <td className="px-[10px]">
              <button
                value={index}
                type="button"
                onClick={getImg}
                className="flex items-center hover:opacity-20 transition-opacity ease-in-out"
              >
                {eventData?.quests[index] ? (
                  <IpfsImage
                    src={`${eventData?.quests[index].reward_uri}`}
                    alt="reward"
                    className="mx-auto object-contain max-w-[50px]"
                  />
                ) : (
                  <div style={{ width: 50, height: 50 }} />
                )}
              </button>
            </td>
            <td className="w-[150px]">
              <button
                value={index}
                type="button"
                onClick={getQRCode}
                className="flex my-4 self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Get QR
              </button>
            </td>
            <td className="w-[200px]">
              <button
                value={index}
                onClick={getClaim}
                type="button"
                className="flex my-4 self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Claim Reward
              </button>
            </td>
            <td className="w-[200px]">
              <button
                value={index}
                onClick={copyToClipBoard}
                type="button"
                className="flex my-4 self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Copy Claim Link
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClaimsList;
