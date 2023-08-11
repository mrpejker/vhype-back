import { useEffect, useState } from 'react';
import ActiveLink from '../../components/active-link';

const ExploreBlock: React.FC = () => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    // Set the flag after 2 seconds
    const timeoutId = setTimeout(() => {
      setFlag(true);
    }, 100);

    // Clean up the timeout if the component unmounts before the timeout finishes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      className={`w-full max-w-[1240px] bg-[url(/lnd_bl2.png)] p-[20px] bottom-[-1000%] bg-no-repeat bg-center bg-cover rounded-lg transform ease-in-out duration-[1500ms]
    ${!flag ? 'translate-y-[1000%]' : 'translate-y-0'}`}
    >
      <div className="flex flex-col w-full max-w-[1040px] md:justify-between md:items-center mx-auto md:flex-row">
        <div className="flex md:mb-0 md:w-2/3 mb-[70px]">
          <h2 className="text-[25px] font-grotesk text-white uppercase">
            check out our training <br /> programme on how to use <br /> the app
          </h2>
        </div>
        <div className="flex justify-center md:w-1/2">
          <ActiveLink
            href="/faq"
            className="p-[20px] rounded-full w-auto py-2 bg-[#41F092] border-[#41F092] border-[1px] hover:bg-transparent transition-colors"
          >
            <span className="text-black hover:text-[#41F092]">Explore vSelf</span>
          </ActiveLink>
        </div>
      </div>
    </section>
  );
};

export default ExploreBlock;
