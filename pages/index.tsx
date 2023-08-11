/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import TopBlock from '../features/landing/top-block';
// import ProductsBlock from '../features/landing/products-block';
import FeaturesBlock from '../features/landing/features-block';
// import ExploreBlock from '../features/landing/explore-block';
import CreateBlock from '../features/landing/create-block';
import VisionBlock from '../features/landing/vision-block';
import AppBlock from '../features/landing/app-block';
import PageLayout from '../components/page-layout';
import PartnersCarousel from '../features/landing/partners-carousel';
import BenefitsBlock from '../features/landing/benefits-block';
import BackedByBlock from '../features/landing/backedby-block';
import DemoBlock from '../features/landing/demo-block';

const Home: NextPage = () => {
  return (
    <PageLayout
      disabled
      pageName="/"
      title="vSelf turn customers into loyal community"
      description="Web3 identity platform for growth hacking and community engagement"
      className="flex flex-col sm:justify-center sm:items-center w-full bg-[#343434] overflow-hidden"
    >
      <TopBlock />
      <BackedByBlock />
      <PartnersCarousel />
      <CreateBlock />
      <div className="flex flex-col justify-center bg-[#1E1E1E] w-full py-[50px] my-[80px]">
        <BenefitsBlock />
        {/* <ProductsBlock /> */}

        <DemoBlock />

        {/* <CarouselComponent /> */}

        <VisionBlock />
      </div>

      <FeaturesBlock />
      <AppBlock />
    </PageLayout>
  );
};

export default Home;
