import React from 'react';
import Modal from '../../components/modal';
import { LinkData, vRandaFormState } from '../../models/vRanda';
import LinkButton from './link-button';
import LinkEditor from './link-editor';
import LinkPreview from './link-preview';
import ChainLink from '../../components/icons/ChainLink';

// TODO: Find proper type for links
interface LinkListProps {
  links: any;
  isEditing?: boolean;
  updateForm: (fields: Partial<vRandaFormState>) => void;
}

const emptyLink: LinkData = { title: '', url: '', meta: undefined };

const LinkList: React.FC<LinkListProps> = ({ links = {}, isEditing, updateForm }) => {
  const [isLinkEditing, setIsLinkEditing] = React.useState<boolean>(false);
  const [linkToEdit, setLinkToEditing] = React.useState<LinkData>(emptyLink);
  const [activeKey, setActiveKey] = React.useState<any>(null);

  const openModal = () => {
    setIsLinkEditing(true);
  };

  const closeModal = () => {
    setIsLinkEditing(false);
    setLinkToEditing(emptyLink);
    setActiveKey(null);
  };

  const selectLinkToEdit = (key: string) => {
    setIsLinkEditing(true);
    setLinkToEditing(links[key]);
    setActiveKey(key);
  };

  const handleNewLink = (link: LinkData) => {
    const newLinks = Object.assign({}, links);

    // Check duplicates TO DO
    // const checkedLinksArray = newLinksArray.filter((el) => el.title == link.title);
    // if (checkedLinksArray.length && !linkToEdit) {
    //   throw 'already exist';
    // }

    if (activeKey !== null) {
      newLinks[activeKey] = link;
    } else {
      const newKey = Math.floor(Math.random() * 1000000 + 1).toString();
      newLinks[newKey] = link;
    }
    updateForm({ links: newLinks });
    closeModal();
  };

  const removeLink = (key: string) => {
    const removedItem = {
      [key]: { title: null, url: null, meta: { url: null, title: null, icon: null, description: null, image: null } },
    };
    const newLinks = Object.assign({}, links, removedItem);
    updateForm({ links: newLinks });
  };

  return (
    <div
      data-testid="profile-links"
      className="flex flex-1 h-full flex-col bg-white rounded-[20px] py-[20px] px-[40px] md:px-[20px]"
    >
      <Modal isOpen={isLinkEditing} onClose={closeModal}>
        <LinkEditor submitLink={handleNewLink} linkToEdit={linkToEdit} />
      </Modal>
      <h2 className="font-inter font-bold text-[#3D3D3D] text-[16px] leading-[22px] mb-4 ml-[5px]">Links</h2>
      {!Object.keys(links).length && <span className="font-inter text-[14px] ml-[5px]">Here are no links yet</span>}
      {Object.keys(links).map((key: string, index: number) => {
        const { title, url, meta } = links[key];
        if (title === null) return;
        return isEditing ? (
          <LinkButton
            key={index}
            linkKey={key}
            title={title}
            url={url}
            meta={meta}
            btnCallback={selectLinkToEdit}
            rmvCallback={removeLink}
            className="bg-[#F5F5F5] h-[46px]"
          />
        ) : (
          <LinkPreview key={index} url={url} meta={meta} title={title} className="bg-[#F5F5F5] h-[46px]" />
        );
      })}
      {isEditing && (
        <button
          onClick={openModal}
          type="button"
          className="flex flex-rox w-full mt-[8px] mb-[40px] h-[40px] items-center justify-center bg-white hover:bg-[#41F092] border-[2px] border-[#41F092] rounded-full  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          <span className="font-inter text-[14px] text-[#3D3D3D] leading-[32px] font-medium mx-[3px]">Add link</span>
          <ChainLink className={'w-[18px] h-[18px] stroke-[#3D3D3D] mx-[3px]'} />
        </button>
      )}
    </div>
  );
};

export default LinkList;
