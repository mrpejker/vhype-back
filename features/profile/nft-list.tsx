import React from 'react';
import Modal from '../../components/modal';
import { LinkData, vRandaFormState } from '../../models/vRanda';
import NftLink from './nft-link';
import NFTLinkEditor from './nftlink-editor';

const URL_PREFIX = 'https://explorer.testnet.near.org/accounts/';
// TODO: Find proper type for nfts
interface NftListProps {
  nfts: any;
  updateForm: (fields: Partial<vRandaFormState>) => void;
  isEditing?: boolean;
  nearid?: string;
}

const NftList: React.FC<NftListProps> = ({ nfts = {}, isEditing = false, nearid = '', updateForm }) => {
  const [isLinkEditing, setIsLinkEditing] = React.useState<boolean>(false);
  const [linkToEdit, setLinkToEditing] = React.useState<LinkData | undefined>(undefined);

  const openModal = () => {
    setIsLinkEditing(true);
  };

  const closeModal = () => {
    setIsLinkEditing(false);
    setLinkToEditing(undefined);
  };

  const handleNewLink = (link: LinkData) => {
    const newNftsCollection = Object.assign({}, nfts);

    // Check duplicates TO DO
    // const checkedNFTSLinksArray = newNftsArray.filter((el) => el.title === link.title);
    // if (checkedNFTSLinksArray.length && !linkToEdit) {
    //   throw 'already exist';
    // }
    const newKey = Math.floor(Math.random() * 1000000 + 1).toString();
    newNftsCollection[newKey] = link;
    updateForm({ nfts: newNftsCollection });
    closeModal();
  };

  const removeLink = (key: string) => {
    const removedItem = {
      [key]: {
        title: null,
        url: null,
        meta: { contract_name: null, url: null, title: null, icon: null, description: null, image: null },
      },
    };
    const newNftsCollection = Object.assign({}, nfts, removedItem);
    updateForm({ nfts: newNftsCollection });
  };
  return (
    <>
      <Modal isOpen={isLinkEditing} onClose={closeModal}>
        <NFTLinkEditor submitLink={handleNewLink} linkToEdit={linkToEdit} nearid={String(nearid)} />
      </Modal>
      <div className="flex flex-row max-[500px]:flex-col justify-between p-[40px] max-[500px]:px-[20px]">
        <h2 className="flex flex-col h-40[px] justify-center font-drukHeavy text-[#3D3D3D] text-[18px] uppercase mx-[5px]">
          Nfts
        </h2>
        {isEditing && <NftListButtons openModal={openModal} />}
      </div>
      <div className="flex flex-col pb-[40px]" data-testid="profile-nfts">
        {Object.keys(nfts).map((key: string, index: number) => {
          const title = nfts[key]?.title || '';
          const meta = nfts[key]?.meta || undefined;
          const url = nfts[key]?.url || '';
          return (
            <NftLink
              key={index}
              linkKey={key}
              title={title}
              meta={meta}
              url={url}
              url_prefix={URL_PREFIX}
              rmvCallback={removeLink}
              isEditing={isEditing}
              nearid={nearid}
            />
          );
        })}
      </div>
    </>
  );
};

const NftListButtons = ({ openModal }: { openModal: () => void }) => (
  <div className="flex flex-row max-[500px]:flex-col max-[500px]:mt-[10px]">
    <button
      onClick={openModal}
      type="button"
      className="flex h-[40px] w-[165px] max-[500px]:w-full flex-col mx-[5px] max-[500px]:mt-[10px] justify-center items-center text-[14px] font-inter bg-transparent border-[2px] border-[#41F092] text-[#3D3D3D] font-medium leading-[32px] rounded-full hover:bg-[#41F092] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      Add NFT
    </button>
    <button
      name="Save"
      type="submit"
      className="flex h-[40px] w-[165px] max-[500px]:w-full mx-[5px] max-[500px]:mt-[10px] justify-center items-center text-[14px] font-inter bg-transparent border-[2px] border-[#41F092] text-[#3D3D3D] font-medium leading-[32px] rounded-full hover:bg-[#41F092] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
    >
      Submit changes
    </button>
  </div>
);

export default NftList;
