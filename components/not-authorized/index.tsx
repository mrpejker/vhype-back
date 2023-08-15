import { useRouter } from 'next/router';
import React from 'react';
import { useWeb3Modal } from '@web3modal/react';

const NotAuthorizedBlock: React.FC = () => {
  const { open: openWalletConnectModal } = useWeb3Modal();

  const handleAuth = async () => {
    openWalletConnectModal();
  };

  return (
    <div className="flex flex-col flex-wrap w-full overflow-x-auto" role="dialog">
      <h2 className="font-drukMedium text-black uppercase mb-2">You are not authorized</h2>
      <p className="text-[#3D3D3D]">
        Please{' '}
        <button onClick={handleAuth} className="cursor-pointer text-[#019FFF] underline hover:no-underline">
          {' '}
          Sign In
        </button>
      </p>
    </div>
  );
};

export default NotAuthorizedBlock;
