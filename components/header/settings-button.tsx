/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface SettingsButtonProps {
  isColored: boolean;
  toggleSettings: () => void;
}

const HeaderSettingsButton: React.FC<SettingsButtonProps> = ({ isColored, toggleSettings }) => {
  const { address } = useAccount();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [address]);

  // UX Design: Setting Proper Class Names for TailwindCSS
  const setSettingsBtnClassName = () => {
    let btnClassName = 'flex justify-center items-center cursor-pointer transition-colors rounded-full border-[1px]';
    if (isConnected) {
      const accountBtnClassName = isColored
        ? 'border-black hover:bg-black text-white hover:text-white' // TO DO check avatar
        : 'border-[#ffffff2b] hover:border-[#41F092] hover:bg-[#41F092] text-white hover:text-black';

      btnClassName = btnClassName + ' sm:flex flex-row ' + accountBtnClassName;
    } else {
      const signInBtnClassName = isColored
        ? 'bg-[#41F092] text-black border-transparent hover:border-[#41F092] hover:bg-transparent'
        : 'bg-[#41F092] text-black hover:text-[#41F092] hover:border-[#41F092]';
      btnClassName =
        btnClassName + ' sm:inline-block border-transparent min-w-[75px] hover:bg-transparent ' + signInBtnClassName;
    }
    return btnClassName + ' ';
  };

  return (
    <button onClick={toggleSettings} className={setSettingsBtnClassName()}>
      {isConnected ? (
        <>
          <img
            src='/ninja2.png'
            alt="avatar-image"
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
        </>
      ) : (
        <p>Sign In</p>
      )}
    </button>
  );
};

export default HeaderSettingsButton;
