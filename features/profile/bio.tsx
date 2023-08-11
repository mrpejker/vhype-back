import React from 'react';
import ActiveLink from '../../components/active-link';
import UploadImageButton from '../../components/uploadImageButton';
import { vRandaFormState } from '../../models/vRanda';
import ChainLink from '../../components/icons/ChainLink';

type BioProps = Partial<vRandaFormState> & {
  isEditing?: boolean;
  nearid?: string;
  updateForm: (fields: Partial<vRandaFormState>) => void;
};

const Bio: React.FC<BioProps> = ({ isEditing, name, bio, avatar_url, nearid, updateForm }) => {
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const key = e.currentTarget.name;
    updateForm({ [key]: value });
  };

  const handleTextareaChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLElement).innerText;
    updateForm({ bio: value });
  };

  const handleImgChange = (file: File | null) => {
    updateForm({ file: file, avatar_url: '' });
  };

  const copyToClipBoard = async () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    const link = `/vranda/${nearid}`;
    navigator.clipboard.writeText(origin + link);
  };

  return (
    <div className="flex flex-col mb-[40px] p-[40px] md:px-[15px]">
      <div className="flex flex-col">
        <div className="flex justify-center items-baseline mt-2 mb-[15px] md:mb-0 relative">
          <UploadImageButton onImageSet={handleImgChange} url={avatar_url} readonly={!isEditing} />
        </div>
        <div className="flex flex-col items-center mt-[20px]" data-testid="profile-parent">
          <input
            disabled={!isEditing}
            data-testid="profile-name"
            autoComplete="off"
            placeholder="Name"
            name="name"
            onChange={handleInputChange}
            value={name}
            type="text"
            className="w-full mb-2 py-1.5 text-center font-medium text-[#3D3D3D] leading-[32px] font-inter text-[24px] bg-transparent bg-clip-padding border-b-[1px] border-[#dedede] transition ease-in-out m-0 outline-none"
          />
          <div
            data-testid="profile-bio"
            placeholder="Bio"
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            role={'textbox'}
            onInput={handleTextareaChange}
            className={
              'w-full px-5 py-1.5 text-center font-normal text-[#3D3D3D] leading-[20px] font-inter text-[14px] md:text-[14px] bg-transparent bg-clip-padding border-0 transition ease-in-out m-0 mb-[18px] outline-none'
            }
          >
            {bio}
          </div>
          <ActiveLink href={`/vranda/${nearid}`}>
            <span className="text-[#41F092] text-[14px] font-normal leading-[28px] underline">{nearid}</span>
          </ActiveLink>
          <button
            onClick={copyToClipBoard}
            type="button"
            className="flex flex-rox w-full mt-[8px] h-[40px] items-center justify-center bg-[#41F092] rounded-full hover:bg-[#76FFAD] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            <span className="font-inter text-[14px] text-[#3D3D3D] leading-[32px] font-medium mx-[3px]">Copy link</span>
            <ChainLink className={'w-[18px] h-[18px] stroke-[#3D3D3D] mx-[3px]'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
