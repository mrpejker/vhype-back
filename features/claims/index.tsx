/* eslint-disable @next/next/no-img-element */
import React, { useReducer } from 'react';
import QRCode from 'react-qr-code';
import Modal from '../../components/modal';
import { AnalyticsEvents } from '../../constants/analytics-events';
import { CollectionData } from '../../models/Event';
import { downloadQR } from '../../utils';
import { logFirebaseAnalyticsEvent } from '../../utils/firebase';
import ClaimForm from './claim-form';
import ClaimsList from './claims-list';
import IpfsImage from '../../components/ipfsImage';

interface ClaimsProps {
  event_id: number;
  claims: string[];
  eventData: CollectionData | undefined;
}

interface ClaimWidgetState {
  qrString: string | null;
  claimString: string | null;
  imgSrc: string | null;
}

enum ClaimWidgetActionKind {
  CLOSE_MODAL = 'CLOSE_MODAL',
  OPEN_IMG_MODAL = 'OPEN_IMG_MODAL',
  OPEN_QR_MODAL = 'OPEN_QR_MODAL',
  OPEN_CLAIM_MODAL = 'OPEN_CLAIM_MODAL',
}

interface ClaimWidgetAction {
  type: ClaimWidgetActionKind;
  payload: string | null;
}

const initialState: ClaimWidgetState = {
  qrString: null,
  claimString: null,
  imgSrc: null,
};

const claimReducer = (state: ClaimWidgetState, action: ClaimWidgetAction) => {
  switch (action.type) {
    case ClaimWidgetActionKind.CLOSE_MODAL:
      return { ...state, qrString: null, claimString: null, imgSrc: null };
    case ClaimWidgetActionKind.OPEN_IMG_MODAL:
      return { ...state, imgSrc: action.payload };
    case ClaimWidgetActionKind.OPEN_QR_MODAL:
      return { ...state, qrString: action.payload };
    case ClaimWidgetActionKind.OPEN_CLAIM_MODAL:
      return { ...state, claimString: action.payload };
    default:
      return state;
  }
};

const Claims: React.FC<ClaimsProps> = ({ claims, event_id, eventData }) => {
  const [{ qrString, imgSrc, claimString }, dispatch] = useReducer(claimReducer, initialState);

  const closeModal = () => {
    dispatch({
      type: ClaimWidgetActionKind.CLOSE_MODAL,
      payload: null,
    });
  };

  const openImgModal = (index: number) => {
    const rewardImg = eventData?.quests[index].reward_uri;
    dispatch({
      type: ClaimWidgetActionKind.OPEN_IMG_MODAL,
      payload: String(rewardImg),
    });
  };

  const openQRCodeModal = (index: number) => {
    const newString = 'https://t.me/vself_bot?start=' + event_id + '_' + claims[index];
    dispatch({
      type: ClaimWidgetActionKind.OPEN_QR_MODAL,
      payload: newString,
    });
  };

  const openClaimModal = (index: number) => {
    dispatch({
      type: ClaimWidgetActionKind.OPEN_CLAIM_MODAL,
      payload: claims[index],
    });
  };

  return (
    <section className="flex flex-col w-full py-[40px] mb-4 overflow-y-auto bg-white rounded-[40px]">
      <Modal isOpen={!!imgSrc} onClose={closeModal}>
        <IpfsImage src={String(imgSrc)} alt="" className="mb-4 object-contain" />
      </Modal>
      <Modal isOpen={!!qrString} onClose={closeModal}>
        <DownloadQR qrString={String(qrString)} />
      </Modal>
      <Modal isOpen={!!claimString} onClose={closeModal}>
        <ClaimForm event_id={event_id} claimString={String(claimString)} />
      </Modal>
      <div className="flex flex-col w-full max-w-[1080px] mx-auto">
        <h2 className="font-drukMedium uppercase text-black text-[30px] mb-[25px]">QR Strings</h2>
        <ClaimsList
          event_id={event_id}
          eventData={eventData}
          claims={claims}
          imgCallback={openImgModal}
          qrbtnCallback={openQRCodeModal}
          claimBtnCallback={openClaimModal}
        />
      </div>
    </section>
  );
};

interface DownloadQRProps {
  qrString: string;
}

const DownloadQR: React.FC<DownloadQRProps> = ({ qrString }) => {
  const download = () => {
    downloadQR(qrString);
    logFirebaseAnalyticsEvent(AnalyticsEvents.CLAIM_QR_DOWNLOADED, {});
  };
  return (
    <div className="flex flex-col">
      <h2 className="font-drukMedium uppercase text-black text-xl mb-2">QR Code</h2>
      <QRCode id="qrcode" value={qrString} />
      <button
        className="mt-4 flex self-center px-6 py-2.5 bg-transparent border-[1px] border-[#019FFF] text-[#019FFF] hover:text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={download}
        type="button"
      >
        Download
      </button>
    </div>
  );
};

export default Claims;
