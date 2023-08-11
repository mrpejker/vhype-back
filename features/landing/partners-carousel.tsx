/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PartnersCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLUListElement>(null);

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     const carousel = carouselRef.current;
  //     const carouselItems = carousel.children; // Get the carousel items
  //     const itemCount = carouselItems.length;
  //     let currentPosition = itemCount - 1;

  //     // Move the first item to the end of the list
  //     carousel.appendChild(carouselItems[0]);

  //     const moveCarousel = () => {
  //       // Move the current slide out of view
  //       carousel.style.transform = `translateX(-${currentPosition * 195}px)`;
  //       currentPosition = (currentPosition - 1 + itemCount) % itemCount;

  //       // Move the next slide to the end of the list
  //       carousel.appendChild(carouselItems[currentPosition]);
  //     };

  //     // Call moveCarousel every 3 seconds
  //     const intervalId = setInterval(moveCarousel, 3000);

  //     // Stop the interval when the component unmounts
  //     return () => clearInterval(intervalId);
  //   }
  // }, [carouselRef]);

  return (
    <section className="relative hidden md:flex flex-col w-full md:flex-row items-center flex-wrap py-[80px] overflow-hidden">
      <p className="font-[Grotesk] font-extrabold text-[32px] text-white leading-[38px] uppercase w-full mx-auto max-w-[1220px] px-[20px]">
        building with <br />
        partners & brands
      </p>
      {/* <div className="w-[200%] h-[100px] overflow-hidden relative"> */}
      {/* <ul className="flex w-[200%] animate-[slideLeft_27000ms_infinite_linear] absolute left-0 gap-[10px]"> */}
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        deviceType="desktop"
        centerMode={true}
        autoPlaySpeed={2000}
        transitionDuration={2000}
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
        containerClass="flex flex-row gap-[10px] mt-[75px]"
        itemClass="flex bg-[#585858] rounded-[10px] w-[185px] mx-[10px] h-[87px] justify-center items-center border-[1px] border-[#585858] transition-colors cursor-pointer hover:bg-transparent"
      >
        <div>
          <img src="/landing/partners/debio.svg" alt="debio" />
        </div>
        <div>
          <img src="/landing/partners/vector.svg" alt="vector" />
        </div>
        <div>
          <img src="/landing/partners/camerabox.svg" alt="camerabox" />
        </div>
        <div>
          <img src="/landing/partners/octopus.svg" alt="octopus" />
        </div>
        <div>
          <img src="/landing/partners/daorec.svg" alt="daorec" />
        </div>
        <div>
          <img src="/landing/partners/myriad.svg" alt="myriad" />
        </div>
        <div>
          <img src="/landing/partners/realitychain.svg" alt="realitychain" />
        </div>
        <div>
          <img src="/landing/partners/popula.svg" alt="popula" />
        </div>
        <div>
          <img src="/landing/partners/nepbot.svg" alt="nepbot" />
        </div>
      </Carousel>
      {/* </article> */}
      {/* </div> */}
    </section>
  );
};

export default PartnersCarousel;
