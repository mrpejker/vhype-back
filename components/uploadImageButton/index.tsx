/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState, useEffect } from 'react';
import TrashIcon from '../icons/TrashIcon';
import UploadIcon from '../icons/UploadIcon';

interface UploadImageButtonProps {
  onImageSet?: (file: File | null) => void;
  file?: File;
  url?: string;
  readonly?: boolean;
}

const UploadImageButton: React.FC<UploadImageButtonProps> = ({ onImageSet, file, url, readonly }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleBtnClick = (): void => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = '';
      inputFileRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length) {
      setImgSrc(URL.createObjectURL(event.target.files[0]));
      onImageSet && onImageSet(event.target.files[0]);
    }
  };

  const removeImage = () => {
    setImgSrc(null);

    onImageSet && onImageSet(null);
  };

  useEffect(() => {
    if (file) {
      setImgSrc(URL.createObjectURL(file));
      return;
    }

    if (url && url !== '') {
      setImgSrc(url);
      return;
    }

    setImgSrc(null);

    return () => {
      setImgSrc(null);
    };
  }, [file, url]);

  return (
    <div className="flex relative flex-col items-center justify-center text-black rounded-[20px]">
      {readonly && !imgSrc && <div className="animate-skeleton pulse w-full pt-[100%] rounded-[10px]" />}
      <button
        disabled={readonly}
        type="button"
        onClick={handleBtnClick}
        className="flex bg-transparent justify-center items-center max-w-sm mb-2 border-0"
      >
        <input
          type="file"
          ref={inputFileRef}
          name="file"
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleImageChange}
        />
        {imgSrc ? (
          <img
            src={imgSrc}
            className="object-cover max-h-[300px] w-[200px] h-[200px] md:w-[120px] md:h-[120px] rounded-full"
            alt=""
          />
        ) : !readonly ? (
          <UploadIcon className="m-[40px] h-[105px] hover:opacity-[0.5] transition-opacity" />
        ) : null}
      </button>
      {!readonly && imgSrc && (
        <button
          type="button"
          className="absolute bottom-[5px] right-0 md:right-0 flex justify-center items-center w-[40px] h-[40px] rounded-full hover:bg-[#f0f0f0] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          onClick={removeImage}
        >
          <TrashIcon className="relative h-[20px] w-[20px] stroke-[#3D3D3D]" />
        </button>
      )}
    </div>
  );
};

export default UploadImageButton;
