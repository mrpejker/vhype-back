/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useEffect } from 'react';
import ActiveLink from '../../components/active-link';

const DemoBlock: React.FC = () => {
  const demoBlockRef = useRef<HTMLDivElement>(null);
  // const [inView, setInView] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (demoBlockRef.current && window.scrollY + window.innerHeight > demoBlockRef.current.offsetTop) {
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
      ref={demoBlockRef}
      className="flex w-full justify-center py-[60px] px-[20px]"
      style={{ backgroundImage: 'linear-gradient(180deg, #1E1E1E 50%, transparent 50%)' }}
    >
      <div className="flex flex-col md:flex-row bg-[#FDA7FF] w-full rounded-[20px] max-w-[1030px] md:pt-[30px] pb-[60px] px-[20px] transform duration-[1500ms] ease-in-out">
        <div className="flex flex-col md:flex-row w-full md:w-2/3 md:justify-between items-center text-center relative">
          <div className="flex relative w-full md:w-1/4 items-center justify-center">
            <img src="/products.png" alt="" className="max-w-[280px] md:absolute md:top-[-150px] md:left-[-50px]" />
          </div>
          <div className="flex flex-col w-full md:w-2/3 text-left">
            <h2 className="font-grotesk text-[#343434] uppercase text-[30px] leading-[27px]">
              turn your customers into loyal community
            </h2>
          </div>
          <img
            src="/landing/small_shape.png"
            alt="shape"
            className="hidden md:block absolute right-[-90px] top-[-20px]"
          />
        </div>
        <div className="flex w-full md:w-1/3 items-center justify-center mt-[20px] relative">
          <ActiveLink
            href="https://calendly.com/tyakushkina/30min"
            className="text-white bg-[#FB40FF] rounded-full px-[40px] py-[8px] border-[1px] border-[#FB40FF] hover:bg-transparent hover:text-[#FB40FF] transition-colors"
          >
            <span className="text-white">Book a demo</span>
          </ActiveLink>
          <img
            src="/landing/color_multistar.png"
            alt="star"
            className="hidden md:block absolute top-[-40px] right-[-80px] "
          />
        </div>
      </div>
    </section>
  );
};

export default DemoBlock;
