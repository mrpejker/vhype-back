/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import ActiveLink from '../../components/active-link';
import TwitterIcon from '../../components/icons/TwitterIcon';
import LinkedInIcon from '../../components/icons/LinkedInIcon';
import HiIcon from '../../components/icons/HiIcon';
import WelcomeIcon from '../../components/icons/WelcomeIcon';
import WebIcon from '../../components/icons/WebIcon';
import PageLayout from '../../components/page-layout';

const AboutPage: NextPage = () => {
  return (
    <PageLayout
      colored
      title="About vSelf"
      description="Web3 identity platform for growth hacking and community engagement"
      pageName="About"
    >
      <div className="flex flex-col items-center px-[20px]">
        <section className="flex flex-col md:flex-row max-w-[1240px] bg-[#343434] p-[30px] md:p-[75px] rounded-xl overflow-hidden">
          <article className="md:w-2/3">
            <h1 className="font-grotesk uppercase text-[#fff] sm:text-[32px] text-[25px]">
              vself — Web3 identity platform for growth hacking and community engagement
            </h1>
            <p className="font-inter text-[#fff] text-[20px] mt-[20px] mb-[65px]">
              vSelf makes next-generation community engagement accessible. It creates a trustworthy interaction channel
              between brands and their customers, providing them with easy-to-use tools to leverage Web3 data for
              loyalty programs, customer relationship management, and digital marketing.
            </p>
            <ActiveLink href="/faq" className="self-center p-[20px] rounded-full w-auto py-2 bg-[#41F092] text-black">
              <span>Explore vSelf</span>
            </ActiveLink>
          </article>
          <div className="flex flex-col w-full max-h-[400px] md:w-1/3 pt-[40px] mt-[40px]" data-aos="slide-up">
            <div className="flex flex-col items-center">
              <div className="animate-ninja_bounce mb-[-40px] relative">
                <WelcomeIcon className="absolute z-[10] top-0 left-[-110px]" />
                <HiIcon className="absolute z-[10] top-[50px] right-[-80px]" />
                <img className="" src="/pink_ninja.png" alt="ninja" height={180} width={145} />
              </div>
              <img className="-top-[50%] animate-pulse" height={370} width={109} src="/lnd_tail.png" alt="ninja" />
            </div>
          </div>
        </section>

        <section
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-cols-max max-w-[1240px] bg-[#F5F5F5] p-[30px] rounded-xl mt-[20px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <img src="/tatiana.png" alt="Tatiana Yakushkina" />
          <div>
            <h2 className="font-drukMedium text-[#3D3D3D] text-[25px] mt-[30px] uppercase">
              Tatiana Yakushkina, PhD, CEO
            </h2>
            <p className="font-inter text-[#3D3D3D] my-[20px]">
              experienced project leader, talented researcher, and university professor
            </p>
          </div>
          <div>
            <p className="font-inter text-[#3D3D3D] mb-[20px]">social media:</p>
            <div className="flex flex-row">
              <ActiveLink href="https://twitter.com/meta_irony_">
                <TwitterIcon className="fill-black  hover:opacity-[0.6] cursor-pointer transition-opacity" />
              </ActiveLink>
              <ActiveLink href="https://www.linkedin.com/in/tyakushkina/">
                <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
              </ActiveLink>
            </div>
          </div>
        </section>

        <section className="flex flex-col max-w-[1240px] w-full mt-[20px] px-[20px] text-left">
          <h2 className="font-grotesk text-[#343434] text-[25px] uppercase">Meet our team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 auto-cols-max">
            <article className="mt-[55px] md:mt-[96px]" data-aos="fade-up" data-aos-delay="300">
              <div className="flex flex-row mb-[20px]">
                <ActiveLink href="https://twitter.com/Eriklintsev">
                  <TwitterIcon className="fill-black  hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
                <ActiveLink href="https://www.linkedin.com/in/ilya-eriklintsev-3a296852/">
                  <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
              </div>
              <h3 className="font-drukMedium text-[#3D3D3D] text-[16px] uppercase">Ilya Eriklintsev, IT Architect</h3>
              <p className="font-inter text-[#3D3D3D] text-[16px] my-[20px]">
                cypherpunk, systems engineer, open web proponent
              </p>
              <img src="/ilya.png" alt="" />
            </article>

            <article className="mt-[55px] md:mt-[250px]" data-aos="fade-up" data-aos-delay="700">
              <div className="flex flex-row mb-[20px]">
                <ActiveLink href="https://twitter.com/sushkazzlo">
                  <TwitterIcon className="fill-black  hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
                <ActiveLink href="https://www.linkedin.com/in/vasily-kharlamov-16b07486/">
                  <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
              </div>
              <h3 className="font-drukMedium text-[#3D3D3D] text-[16px] uppercase">
                Vasily Kharlamov, Frontend Developer
              </h3>
              <p className="font-inter text-[#3D3D3D] text-[16px] my-[20px]">
                skilled front-end with a passion for UX/UI design
              </p>
              <img src="/vasya.png" alt="" />
            </article>

            <article className="mt-[55px] md:mt-[40px]" data-aos="fade-up" data-aos-delay="500">
              <div className="flex flex-row mb-[20px]">
                <ActiveLink href="https://www.sites.google.com/view/uberbax-gaming/">
                  <WebIcon className=" text-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
                <ActiveLink href="https://www.linkedin.com/in/inga-kalinina-b5083a236/">
                  <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
              </div>
              <h3 className="font-drukMedium text-[#3D3D3D] text-[16px] uppercase">Inga Kalinina, PhD, CTO</h3>
              <p className="font-inter text-[#3D3D3D] text-[16px] my-[20px]">
                research scientist, entrepreneur, and game developer
              </p>
              <img src="/inga.png" alt="" />
              <div className="flex flex-row mt-[40px] mb-[20px]">
                <ActiveLink href="https://twitter.com/sophireum">
                  <TwitterIcon className="fill-black  hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
                <ActiveLink href="https://www.linkedin.com/in/sophia-rusconi-69529124a/">
                  <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
              </div>
              <h3 className="font-drukMedium text-[#3D3D3D] text-[16px] uppercase">Sophia Rusconi, Growth hacker</h3>
              <p className="font-inter text-[#3D3D3D] text-[16px] my-[20px]">
                partnership manager, entrepreneur with expertise in product management, strategist
              </p>
              <img src="/sophia.png" alt="" />
            </article>

            <article className="mt-[55px] md:mt-[146px]" data-aos="fade-up" data-aos-delay="900">
              <div className="flex flex-row mb-[20px]">
                <ActiveLink href="https://twitter.com/SergantChe">
                  <TwitterIcon className="fill-black  hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
                <ActiveLink href="https://www.linkedin.com/in/sergey-kozlov-7b3520127/">
                  <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
              </div>
              <h3 className="font-drukMedium text-[#3D3D3D] text-[16px] uppercase">
                Sergey Kozlov, Full Stack Developer
              </h3>
              <p className="font-inter text-[#3D3D3D] text-[16px] my-[20px]">
                math enthusiast and a seasoned software engineer
              </p>
              <img src="/sega.png" alt="" />
            </article>

            <article className="mt-[55px] md:mt-[266px]" data-aos="fade-up" data-aos-delay="1000">
              <div className="flex flex-row mb-[20px]">
                <ActiveLink href="https://twitter.com/ArtSpaceOfGrace">
                  <TwitterIcon className="fill-black  hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
                <ActiveLink href="https://www.linkedin.com/in/roxanabalan/">
                  <LinkedInIcon className="fill-black hover:opacity-[0.6] cursor-pointer transition-opacity" />
                </ActiveLink>
              </div>
              <h3 className="font-drukMedium text-[#3D3D3D] text-[16px] uppercase">Roxana Balan, CMO</h3>
              <p className="font-inter text-[#3D3D3D] text-[16px] my-[20px]">
                strong background in behavioural science, driven by purposeful projects
              </p>
              <img src="/roxana.png" alt="" />
            </article>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row max-w-[1240px] bg-[url(/mission_bg.png)] bg-cover bg-no-repeat rounded-xl mt-[100px] mb-[40px] pt-[40px] px-[80px] font-inter">
          <article className="flex flex-col w-full md:w-2/3">
            <h2 className="font-drukMedium text-[#fff] text-[25px] uppercase">Vision</h2>
            <p className="text-[#fff] text-[20px] mb-[40px]">
              Why do brands struggle to build authentic relationships with their customers? Imagine running a local
              business where available IT tools are complex, inefficient, and heavily dependent on big tech companies.
              You pay middlemen driven by wrong incentives that fail to protect your customers&apos; privacy.
            </p>
            <p className="text-[#fff] text-[20px]">
              At vSelf, we understand that community is the main driver of brand growth. That&apos;s why we provide
              instruments to engage, facilitate, and reward members, changing the way we structure brand communities.
            </p>
            <p className="font-interBold text-[#fff] text-[20px] my-[35px]">How we do it?</p>
            <p className="text-[#fff] text-[20px] mb-[40px]">
              vSelf provides user-friendly tools allow businesses to leverage Web3 data for SMM campaigns, loyalty
              programs, and gamification mechanics. Brands can increase customer acquisition and reward their most loyal
              customers while gaining a deeper understanding of their needs.
            </p>
          </article>
          <div
            className="flex flex-col w-full max-h-[400px] md:w-1/3 pt-[40px]"
            data-aos="slide-up"
            data-aos-delay="600"
          >
            <div className="flex flex-col items-center">
              <div className="animate-ninja_bounce mb-[-40px] relative">
                <img className="" src="/lnd_nj.png" alt="ninja" height={180} width={145} />
              </div>
              <img className="-top-[50%] animate-pulse" height={370} width={109} src="/lnd_tail.png" alt="ninja" />
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
