/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import ClaimForm from '../../features/claims/claim-form';
import { getFirestoreDocumentData } from '../../utils/firebase';
import { getConnectedContract } from '../../utils/contract';
import PageLayout from '../../components/page-layout';

interface ClaimPageProps {
  event_id: number;
  strings: string[];
  isPrivate: boolean;
}
const ClaimPage: NextPage<ClaimPageProps> = ({ strings, isPrivate, event_id }) => {
  const [eventError, setEventError] = useState<boolean>(false);
  const { asPath } = useRouter();

  // Check that event exists
  useEffect(() => {
    const tryGetEventData = async () => {
      // Create contract instance
      const connection = await getConnectedContract();
      const { contract } = connection;
      const event_data = await contract.get_event_data({ event_id: Number(event_id) });
      if (event_data === null) setEventError(true);
    };

    tryGetEventData();
  }, []);

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const URL = `${origin}${asPath}`; // to do it's not used
  return (
    <PageLayout
      title="Claim Your NFT Reward"
      description="Claim Your NFT Reward"
      category="Products"
      pageName="Claim Your NFT Reward"
    >
      {eventError ? (
        <section className="flex flex-col w-full items-center mt-[120px] px-[20px]">
          <div className="flex flex-col w-full bg-white p-[20px] rounded-lg max-w-[600px] my-[40px]">
            <h2 className="font-drukMedium uppercase text-black text-xl mb-2">Something went wrong</h2>
            <p className="text-[#3D3D3D]">{`The event ${event_id} is not found `}</p>
          </div>
        </section>
      ) : (
        <section className="flex flex-col w-full items-center">
          {strings.map((claimString: string, index: number) => (
            <div key={index} className="flex flex-col w-full bg-white p-[20px] rounded-lg max-w-[600px] my-[40px]">
              <ClaimForm isPrivate={isPrivate} event_id={Number(event_id)} claimString={String(claimString)} />
            </div>
          ))}
        </section>
      )}
    </PageLayout>
  );
};

ClaimPage.getInitialProps = async ({ query }) => {
  const event_id = query.slug;
  const strings = query.strings;
  const res: any = await getFirestoreDocumentData('claims', String(event_id));
  const isPrivate = res?.isPrivate || false;

  return {
    event_id: Number(event_id),
    isPrivate: isPrivate,
    strings: String(strings).split(','),
  };
};

export default ClaimPage;
