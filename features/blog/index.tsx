/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import { setFirestoreDocumentData, uploadImageToFirebaseStorage } from '../../utils/firebase';
import NotAuthorizedBlock from '../../components/not-authorized';
import Toast from '../../components/toast';
import Loader from '../../components/loader';
import UploadImageButton from '../../components/uploadImageButton';
import { NewPostState } from '../../models/Blog';
import TagInput from '../../components/tagInput';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const BlogEditor: React.FC = () => {
  const { accountId } = useWalletSelector();

  const [formState, setFormState] = useState<NewPostState>({
    title: '',
    content: '',
    categories: [],
  });

  const [file, setFile] = useState<File | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [toast, setToast] = useState({
    isShown: false,
    message: '',
  });

  const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFormState((prev) => ({ ...prev, title: value }));
  };

  const handleChange = (content: string) => {
    setFormState((prev) => ({ ...prev, content }));
  };

  const handleCategories = (categories: string[]) => {
    setFormState((prev) => ({ ...prev, categories }));
  };

  const onImageChange = (image: File | null) => {
    if (image) {
      setFile(image);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      Object.keys(formState).forEach((key) => {
        if ((formState as any)[key].length == 0) {
          throw new Error('Fill the required fields');
        }
      });

      if (file === undefined) {
        throw new Error('Please upload the thumbnail');
      }

      const postTitle = formState.title.toLowerCase().replace(/ /g, '-');
      const thumbnail = await uploadImageToFirebaseStorage(file);

      await Promise.all([
        setFirestoreDocumentData('feed', postTitle, {
          title: formState.title,
          categories: formState.categories,
          thumbnail,
          link: `/blog/post/${postTitle}`,
          author: accountId,
          date: new Date().toLocaleDateString(),
        }),
        setFirestoreDocumentData('blog', postTitle, {
          ...formState,
          thumbnail,
          author: accountId,
          date: new Date().toLocaleDateString(),
        }),
      ]);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setToast({
        isShown: true,
        message: String(err),
      });
      setTimeout(() => {
        setToast({
          isShown: false,
          message: '',
        });
      }, 2000);
      setIsLoading(false);
    }
  };

  if (!accountId) {
    return <NotAuthorizedBlock />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full h-full px-[20px] gap-5">
      <Toast isShown={toast.isShown} message={toast.message} />

      <h2 className="font-drukMedium text-[24px]">New Post</h2>
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center">
          <img
            src="/ninja2.png"
            alt="avatar"
            className="border-[1px] border-[#FB40FF] w-[30px] h-[30px] rounded-full object-cover"
          />{' '}
          {accountId}
        </div>
        <p>
          <span className="font-bold">Date: </span> {new Date().toLocaleDateString()}
        </p>
      </div>
      <Loader is_load={isLoading}>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-5 mb-4 w-full md:w-2/3">
            <input
              onChange={handleTitle}
              value={formState.title}
              type="text"
              className="bg-[#fafafa] text-[18px] outline-none border-[1px] border-[#dadada] rounded-[6px] p-[15px]"
              placeholder="Post title"
            />
            <SunEditor
              placeholder="Please type post content here..."
              onChange={handleChange}
              setOptions={{
                height: '550px',
                buttonList: [
                  ['undo', 'redo'],
                  ['font', 'fontSize', 'formatBlock'],
                  ['paragraphStyle', 'blockquote'],
                  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                  ['fontColor', 'hiliteColor', 'textStyle'],
                  ['image', 'list'],
                  ['codeView'],
                ],
              }}
            />
          </div>

          <aside className="flex flex-col self-start sticky w-full md:w-1/3 md:basis-1/3 mb-4 border-[1px] border-[#dadada] rounded-[6px] p-[14px] bg-[#fafafa]">
            <h2 className="font-interBold font-bold">Thumbnail</h2>
            <UploadImageButton file={file} onImageSet={onImageChange} />
            <TagInput callbackfn={handleCategories} />
            <button
              type="submit"
              className="relative flex justify-center gap-4 items-center hover:text-white w-full mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#57BFFF] text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              <span>Create Post</span>
            </button>
          </aside>
        </div>
      </Loader>
    </form>
  );
};

export default BlogEditor;
