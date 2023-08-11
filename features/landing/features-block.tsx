import React, { useEffect, useRef, useState } from 'react';

const features = [
  'emergent market niche',
  'smooth web3 onboarding',
  'web 3.0-native architecture',
  'multichain support',
  'nft-based gamification',
  'web3 reputation tools',
  'smooth web3 onboarding',
  'Verifiable Credentials',
  'base for ethical data market',
  'privacy by design',
  'emergent market niche',
  'smooth web3 onboarding',
  'web 3.0-native architecture',
  'multichain support',
  'nft-based gamification',
  'web3 reputation tools',
  'smooth web3 onboarding',
  'Verifiable Credentials',
  'base for ethical data market',
  'privacy by design',
  'emergent market niche',
  'smooth web3 onboarding',
  'web 3.0-native architecture',
  'multichain support',
  'nft-based gamification',
  'web3 reputation tools',
  'smooth web3 onboarding',
  'Verifiable Credentials',
  'base for ethical data market',
  'privacy by design',
];

const FeaturesBlock: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef.current && window.scrollY + window.innerHeight > featuresRef.current.offsetTop) {
        setInView(true);
      } else {
        setInView(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRandomPosition = () => ({
    x: `${Math.floor(Math.random() * (featuresRef.current?.clientWidth || 0))}px`,
    y: `${Math.floor(Math.random() * (featuresRef.current?.clientHeight || 0))}px`,
  });

  const getRandomDurationAndDelay = () => {
    const duration = `${Math.floor(Math.random() * 1000) + 1500}ms`;
    const delay = `${Math.floor(Math.random() * 1000)}ms`;
    return { duration, delay };
  };

  const getRandomAngle = () => `${Math.floor(Math.random() * 20) - 10}deg`;

  const getRandomBackgroundBubble = () => {
    if (typeof window !== undefined) {
      const randomInt = Math.floor(Math.random() * 3);
      switch (randomInt) {
        case 0:
          return 'bg-[url(/indigobuble.png)] text-black';
        case 1:
          return 'bg-[url(/greenbuble.png)] text-black';
        default:
          return 'bg-[url(/bluebuble.png)]';
      }
    } else {
      return 'bg-[url(/bluebuble.png)]';
    }
  };

  return (
    <section
      ref={featuresRef}
      className="hidden md:block relative min-h-[500px] bg-[url(/vself_features.png)] bg-center bg-no-repeat bg-contain w-full mt-[20px] mb-[60px]"
      id="container"
    >
      {features.map((feature: string, index: number) => (
        <div
          key={index}
          className={`transition-all duration-[3000ms] ease-in-out absolute top-0 left-[-2000px] w-[300px] h-[42px] bg-center bg-no-repeat bg-contain items-center flex justify-center ${getRandomBackgroundBubble()} ${
            inView ? '' : 'translate-x-full'
          }`}
          style={{
            left: getRandomPosition().x,
            top: getRandomPosition().y,
            transitionDuration: getRandomDurationAndDelay().duration,
            transitionDelay: getRandomDurationAndDelay().delay,
            transform: `rotate(${getRandomAngle()})`,
          }}
        >
          <p>{feature}</p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesBlock;
