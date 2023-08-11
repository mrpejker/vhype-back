import { useEffect, useRef } from 'react';
import { PostProps } from '../../models/Blog';

const PostPreview: React.FC<PostProps> = ({ title, link, thumbnail, description, categories = [] }) => {
  const titleRef = useRef<HTMLAnchorElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.innerHTML = title;
    }
    if (descriptionRef.current) {
      // descriptionRef.current.innerHTML = description;
    }
    if (imgRef.current) {
      imgRef.current.style.backgroundImage = thumbnail;
    }
  }, [titleRef, title, descriptionRef, description, thumbnail]);
  return (
    <div className="grid cursor-pointer hover:shadow-lg flex-col sm:max-w-[300px] border-[#D9D9D9] border-[1px] rounded-lg p-[14px]">
      <a href={link}>
        <div
          ref={imgRef}
          style={{ background: 'url(' + thumbnail + ') center no-repeat', backgroundSize: 'cover' }}
          className="sm:max-w-[260px] w-full h-[160px] rounded-lg mb-[4px]"
        />
        <p className="text-[#B1B1B1] mb-[4px]">{categories.join(' ')}</p>
        <p className="text-[#343434] hover:underline">{title}</p>
      </a>
      <p ref={descriptionRef}></p>
    </div>
  );
};

export default PostPreview;
