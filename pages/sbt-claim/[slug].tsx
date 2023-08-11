/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from 'next';
import ClaimFormUnauthorized from '../../features/claims/claim-unauthorized';
import { getFirestoreDocumentData } from '../../utils/firebase';

interface ClaimPageProps {
  event_id: number;
  strings: string[];
}
const ClaimPage: NextPage<ClaimPageProps> = ({ strings, event_id }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-[10px]">
      {strings.map((claimString: string, index: number) => (
        <div key={index} className="flex flex-col w-full bg-white p-[20px] rounded-lg max-w-[600px] my-[40px]">
          <ClaimFormUnauthorized event_id={Number(event_id)} claimString={String(claimString)} />
        </div>
      ))}
    </main>
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
