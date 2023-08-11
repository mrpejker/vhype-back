/* eslint-disable @next/next/no-img-element */
import React from 'react';

const BackedByBlock: React.FC = () => {
  return (
    <section className="flex flex-col w-full max-w-[1220px] mx-auto md:flex-row items-start md:items-center justify-start flex-wrap gap-[40px] py-[80px] px-[20px]">
      <p className="font-[Grotesk] font-extrabold text-[32px] text-white leading-[38px] uppercase">
        Backed <br />
        by
      </p>
      <img src="/landing/near_logo.png" alt="NEAR" className="max-h-[40px] md:max-h-max md:max-w-[230px] md:m-auto" />
      <img src="/landing/ov_logo.png" alt="Outlier Ventures" className="md:max-w-[430px]" />
    </section>
  );
};

export default BackedByBlock;
