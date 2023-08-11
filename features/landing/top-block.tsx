import React, { useState } from 'react';
import Modal from '../../components/modal';
import NinjaComponent from '../../components/ninja';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { isStringEmpty } from '../../utils';
import { addDocumentToFirestoreCollection, logFirebaseAnalyticsEvent } from '../../utils/firebase';

const TopBlock: React.FC = () => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const closeModal = () => {
    setIsSent(false);
  };

  const handleEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEmail(value);
  };

  const submitForm = (event: React.FormEvent): void => {
    event.preventDefault();
    if (isStringEmpty(email)) {
      return;
    }
    addDocumentToFirestoreCollection('donate_emails', { email });
    setIsSent(true);
    setEmail('');
    logFirebaseAnalyticsEvent(AnalyticsEvents.EMAIL_SUBMITTED_LANDING, {});
  };

  return (
    <section className="flex flex-col w-full max-w-[1220px] md:flex-row items-center pt-[155px] pb-[80px] px-[20px]">
      <Modal isOpen={isSent} onClose={closeModal}>
        <h2 className="font-drukBold text-[#3D3D3D] uppercase mb-4">Thank you!</h2>
        <p className="text-[#3D3D3D]">We&apos;ve got yor email!</p>
      </Modal>
      <div className="flex flex-col w-full md:w-1/2 self-baseline">
        <h1 className="uppercase font-[DrukMedium] text-[25px] text-white leading-[30px]">
          vSelf helps brands turn customers into loyal vibrant community
        </h1>
        <p className="font-[Inter] text-[19px] leading-[24px] text-white">
          Сonnect to be added in our whitelist: be the first to get access to our private beta
        </p>
        <form onSubmit={submitForm} className="mt-[80px]">
          <div className="flex flex-col items-start md:flex-row md:items-center">
            <input
              value={email}
              onChange={handleEmailInput}
              type="email"
              placeholder="Email"
              className="text-[#41F092] outline-none p-2 bg-transparent border-b-[1px] border-[#B1B1B1] focus:border-[#41F092] md:min-w-[300px] md:mr-4 mb-[31px] md:mb-0"
            />
            <button
              type="submit"
              className="w-[167px] md:self-end font-[Inter] p-[20px] py-[7px] border-[1px] rounded-[20px] text-[#41F092] border-[#41F092] hover:bg-[#41F092] hover:text-[#343434]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-full md:w-1/2 mt-[100px] md:mt-0">
        <NinjaComponent />
      </div>
    </section>
  );
};

export default TopBlock;
