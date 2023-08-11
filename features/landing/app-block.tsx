/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react';
import ActiveLink from '../../components/active-link';
// import ActiveLink from '../../components/active-link';
// import AppleStoreIcon from '../../components/icons/AppleStoreIcon';
// import GoogleStoreIcon from '../../components/icons/GoogleStoreIcon';
import Ninja2Component from '../../components/ninja2';

const AppBlock: React.FC = () => {
  const appBlockRef = useRef<HTMLDivElement>(null);
  // const [inView, setInView] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (appBlockRef.current && window.scrollY + window.innerHeight > appBlockRef.current.offsetTop) {
  //       setInView(true);
  //     } else {
  //       setInView(false);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section
      id="ourapp"
      ref={appBlockRef}
      className="flex flex-col items-center mt-[20px] mb-[60px] w-full  max-w-[1240px] relative"
    >
      <img
        src="/landing/color_multistar.png"
        alt="star"
        className="hidden md:block absolute top-[70px] left-[-70px] z-10"
      />
      <div className="flex flex-col md:flex-row overflow-hidden w-full rounded-[30px] p-[40px] bg-gradient-to-r from-cyan-500 to-blue-500 transform duration-[1500ms] ease-in-out relative">
        <div className="flex md:w-1/2 items-center justify-center relative">
          <Ninja2Component />
          <img
            src="/landing/small_shape.png"
            alt="shape"
            className="hidden md:block absolute right-[60px] top-[150px]"
          />
        </div>
        <div className="flex flex-col md:w-1/2 items-center">
          <h3 className="text-white uppercase mb-[10px] text-center text-[31px] leading-[26px] font-[DrukMedium]">
            Reach out
          </h3>
          <p className="font-inter text-center text-white text-[20px] leading-[22px] mb-[20px]">
            Elevate your digital marketing with vSelf
          </p>
          <div className="flex flex-col md:flex-row items-center md:mt-[20px] gap-[10px]">
            <ActiveLink
              href="https://calendly.com/tyakushkina/30min"
              className="bg-[#41F092] rounded-[50px] w-[240px] h-[50px] text-[18px] text-center items-center flex justify-center"
            >
              <span className="text-[#343434]">Book a demo</span>
            </ActiveLink>
            <span className="flex items-center text-white gap-[10px]">
              <img src="/landing/mail.svg" alt="" />
              mail to:
              <a href="mailto:info@vself.app" className="underline">
                info@vself.app
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBlock;
