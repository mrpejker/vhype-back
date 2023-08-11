/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react';
import ActiveLink from '../../components/active-link';

const CreateBlock: React.FC = () => {
  const createBlockRef = useRef<HTMLDivElement>(null);
  // const [inView, setInView] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (createBlockRef.current && window.scrollY + window.innerHeight > createBlockRef.current.offsetTop) {
  //       setInView(true);
  //     } else {
  //       setInView(false);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section ref={createBlockRef} className="flex w-full justify-center py-[80px] px-[20px]">
      <div className="flex flex-col items-center md:flex-row bg-[url(/landing/create_bg.png)] bg-cover bg-no-repeat bg-center w-full rounded-[20px] max-w-[1030px] py-[20px] md:py-[58px] px-[20px]">
        <div className="flex flex-col md:flex-row w-full md:w-2/3 md:justify-between items-center text-center">
          <div className="flex flex-col w-full md:w-1/4 text-left relative">
            <img src="/landing/shape.png" alt="shape" className="hidden md:block absolute left-[-30px] top-[-70px]" />
          </div>
          <div className="flex flex-col w-full text-left justify-center">
            <h2 className="font-inter font-normal text-white text-[21px] md:text-[30px] leading-[40px] mb-[20px] md:mb-0 text-center md:text-left">
              Create your first web3-
              <br />
              powered campaign now
            </h2>
          </div>
        </div>
        <div className="flex w-full md:w-1/3 items-center justify-center relative">
          <ActiveLink
            href="/add"
            className=" bg-white text-[18px] leading-[32px] rounded-full px-[40px] py-[8px] border-[1px] border-white hover:bg-transparent transition-colors hover:text-white"
          >
            <span className="text-[#3D3D3D]">Try vSelf</span>
          </ActiveLink>
          <img
            src="/landing/small_shape.png"
            alt="shape"
            className="hidden md:block absolute right-[-60px] top-[-50px]"
          />
        </div>
      </div>
    </section>
  );
};

export default CreateBlock;
