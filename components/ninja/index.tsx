/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Bubble1Icon from '../icons/Bubble1Icon';
import Bubble2Icon from '../icons/Bubble2Icon';
import Bubble3Icon from '../icons/Bubble3Icon';

const NinjaComponent: React.FC = () => {
  const [activeBubble, setActiveBubble] = useState<number>(1);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // Set the flag after 2 seconds
    const timeoutId = setTimeout(() => {
      setFlag(true);
    }, 100);

    // Clean up the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const bubbleInterval = setInterval(() => {
      const newActiveBubble = activeBubble + 1;
      if (newActiveBubble > 2) {
        setActiveBubble(0);
        return;
      }
      setActiveBubble(newActiveBubble);
    }, 3000);
    return () => {
      clearInterval(bubbleInterval);
    };
  }, [activeBubble]);

  const svgFill = (num: number) => {
    return activeBubble === num ? '#0CD0EE' : '#296D96';
  };

  return (
    <div
      className={`flex flex-col items-center transform ease-in-out duration-[1500ms] ${
        !flag ? 'translate-y-[1000%]' : 'translate-y-0'
      }`}
    >
      <div className="animate-ninja_bounce relative ">
        <Bubble1Icon
          className="absolute z-[10] top-[-20px] md:top-0 left-[-110px] md:left-[-150px]"
          fill={svgFill(0)}
        />
        <Bubble2Icon className="absolute z-[10] top-[50px] right-[-80px]" fill={svgFill(1)} />
        <Bubble3Icon className="absolute z-[10] top-[150px] left-[-80px] md:left-[-120px]" fill={svgFill(2)} />
        <img className="" src="/lnd_nj.png" alt="ninja" height={180} width={145} />
      </div>
      {/* <img className="-top-[50%] animate-pulse" height={370} width={109} src="/lnd_tail.png" alt="ninja" /> */}
    </div>
  );
};

export default NinjaComponent;
