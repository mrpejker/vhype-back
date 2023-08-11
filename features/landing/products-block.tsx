/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import ActiveLink from '../../components/active-link';

const ProductsBlock: React.FC = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (productsRef.current && window.scrollY + window.innerHeight > productsRef.current.offsetTop) {
        setInView(true);
      } else {
        setInView(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={productsRef} className="bg-[#1E1E1E] w-full pt-[40px] pb-[80px]">
      <div
        className={`w-full max-w-[1240px] mx-auto transform duration-[1500ms] ${
          inView ? 'translate-y-0' : 'translate-y-[1000%]'
        }`}
      >
        <h2 className="px-[20px] max-w-[1080px] mx-auto text-white uppercase text-[25px] font-grotesk mb-[40px]">
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          <div className="flex flex-col ">
            <ActiveLink
              href="/vranda"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[75px]"
            >
              <h3 className="font-drukBold text-[30px] uppercase text-white">vRanda</h3>
            </ActiveLink>
          </div>
          <div className="flex flex-col ">
            <ActiveLink
              href="/vstudio"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[75px]"
            >
              <h3 className="font-drukBold text-[30px] uppercase text-white">Web3 Studio</h3>
            </ActiveLink>
          </div>
          <div className="flex flex-col ">
            <ActiveLink
              href="/#ourapp"
              className="items-center justify-center text-center transform transition duration-500 cursor-pointer bg-[#343434] hover:bg-[#276BEB] rounded-[20px] py-[50px]"
            >
              <h3 className="font-drukBold text-[30px] uppercase text-white">
                <b>
                  Identity
                  <br /> Wallet
                </b>
              </h3>
            </ActiveLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsBlock;
