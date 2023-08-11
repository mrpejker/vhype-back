import { useRef, useState, useEffect } from 'react';

/* eslint-disable @next/next/no-img-element */
const VisionBlock: React.FC = () => {
  const visionBlockRef = useRef<HTMLDivElement>(null);
  // const [inView, setInView] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (visionBlockRef.current && window.scrollY + window.innerHeight > visionBlockRef.current.offsetTop) {
  //       setInView(true);
  //     } else {
  //       setInView(false);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section ref={visionBlockRef} className="flex w-full items-center flex-col mx-auto py-[60px] ">
      <div className="flex flex-col w-full max-w-[1220px] bg-[#1E1E1E] rounded-[50px] px-[20px]">
        <h2 className="font-grotesk mb-[40px] text-white uppercase text-[32px] leading-[38px]">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[95px] auto-cols-max max-w-[1080px]">
          <div className="flex flex-col items-center w-full">
            <img src="/account.png" alt="" className="w-full" />
            <div className="mt-[40px]">
              <h3 className="font-[DrukMedium] text-[#41F092] uppercase text-[15px] leading-[18px] mb-[14px]">
                Loyalty & SMM campaigns
              </h3>
              <p className="font-inter text-[16px] text-[#D9D9D9]">
                Improve customer acquisition and retention with the power of Web3 technology
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/sol.png" alt="" className="w-full" />
            <div className="mt-[40px]">
              <h3 className="font-[DrukMedium] text-[#41F092] uppercase text-[15px] leading-[18px] mb-[14px]">
                easy-to-use analytics
              </h3>
              <p className="font-inter text-[16px] text-[#D9D9D9]">
                Manage customer relationships and get statistics and customer 360 in our Web Studio
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/who.png" alt="" className="w-full" />
            <div className="mt-[40px]">
              <h3 className="font-[DrukMedium] text-[#41F092] uppercase text-[15px] leading-[18px] mb-[14px]">
                user persona & data ownership
              </h3>
              <p className="font-inter text-[16px] text-[#D9D9D9]">
                vSelf team has years your experience in web3 development and computer science research
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionBlock;
