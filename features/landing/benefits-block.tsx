/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import ActiveLink from '../../components/active-link';

const BenefitsBlock: React.FC = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  // const [inView, setInView] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (productsRef.current && window.scrollY + window.innerHeight > productsRef.current.offsetTop) {
  //       setInView(true);
  //     } else {
  //       setInView(false);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section className="flex flex-col self-center w-full max-w-[1320px] px-[20px] pb-[60px]">
      <h2 className="flex w-full max-w-[1140px] text-white uppercase text-[32px] leading-[38px] font-grotesk mb-[40px] self-center">
        Benefits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
        {/* TODO style for clickable buttons cursor-pointer hover:bg-[#276BEB]*/}
        <div className="flex flex-col items-center justify-center text-center transform transition duration-500 bg-[#343434] rounded-[20px] py-[50px] relative">
          <img src="/landing/Star.png" alt="star" className="hidden md:block absolute left-[-70px]" />
          {/* <ActiveLink
              href="/vranda"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[75px]"
            > */}
          <h3 className="font-drukBold text-[30px] uppercase text-white">Stronger community</h3>
          {/* </ActiveLink> */}
        </div>
        <div className="flex flex-col items-center justify-center text-center transform transition duration-500 bg-[#343434] rounded-[20px] py-[50px] relative">
          <img src="/landing/color_shape.png" alt="star" className="hidden md:block absolute top-[-70px]" />
          {/* <ActiveLink
              href="/vstudio"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[75px]"
            > */}
          <h3 className="font-drukBold text-[30px] uppercase text-white">Better engagement</h3>
          <img
            src="/landing/color_shape.png"
            alt="star"
            className="hidden md:block absolute bottom-[-40px] right-[70px] w-[70px]"
          />

          {/* </ActiveLink> */}
        </div>
        <div className="flex flex-col items-center justify-center text-center transform transition duration-500 bg-[#343434] rounded-[20px] py-[50px] relative">
          {/* <ActiveLink
              href="/#ourapp"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[50px]"
            > */}
          <h3 className="font-drukBold text-[30px] uppercase text-white px-[10px]">Data ownership</h3>
          {/* </ActiveLink> */}
          <img
            src="/landing/multistar.png"
            alt="star"
            className="hidden md:block absolute bottom-[70px] right-[-30px] w-[70px]"
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsBlock;
