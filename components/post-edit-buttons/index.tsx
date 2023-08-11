import TrashIcon from '../icons/TrashIcon';

interface PostEditButtonsProps {
  deleteCallback: () => void;
  editCallback: () => void;
}

const PostEditButtons: React.FC<PostEditButtonsProps> = ({ deleteCallback, editCallback }) => {
  return (
    <>
      <button
        type="button"
        className="relative flex justify-center gap-4 items-center hover:text-white w-full mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#57BFFF] text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={deleteCallback}
      >
        <span>Delete Post</span>
        <TrashIcon className="absolute top-[10px] right-5 h-[20px] w-[20px]" />
      </button>
      <button
        type="button"
        className="relative flex justify-center gap-4 items-center hover:text-white w-full mt-4 text-center text-[16px] font-inter px-6 py-[16px] bg-[#57BFFF] border-[1px] border-[#57BFFF] text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-[#019FFF] focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={editCallback}
      >
        <span>Edit Post</span>
        <TrashIcon className="absolute top-[10px] right-5 h-[20px] w-[20px]" />
      </button>
    </>
  );
};

export default PostEditButtons;
