import { KeyboardEvent, useState } from 'react';

interface TagInputProps {
  callbackfn: (categories: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ callbackfn }) => {
  const [tags, setTags] = useState<string[]>([]);
  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { value } = event.currentTarget;
      const newTagsArr = [String(value), ...tags];
      setTags(newTagsArr);
      callbackfn(newTagsArr);
      event.currentTarget.value = '';
    }
  };
  const removeTag = (index: number) => {
    const newTagsArr = [...tags];
    newTagsArr.splice(index, 1);
    setTags(newTagsArr);
    callbackfn(newTagsArr);
  };
  return (
    <div className="flex flex-col w-full mt-[10px]">
      <p className="font-interBold font-bold">Category:</p>
      <div className="my-[5px] break-words flex-wrap">
        {tags.map((tag, ind) => (
          <span key={ind} className="p-[5px] bg-[#D9D9D9] m-1 rounded-[5px]">
            {tag}
            <span className="ml-2 text-[#fafafa] cursor-pointer" onClick={() => removeTag(ind)}>
              &times;
            </span>
          </span>
        ))}
      </div>
      <input
        onKeyDown={handleSubmit}
        type="text"
        className="bg-[#fafafa] text-[18px] outline-none border-[1px] border-[#dadada] rounded-[6px] p-[10px] mt-[10px]"
      />
    </div>
  );
};

export default TagInput;
