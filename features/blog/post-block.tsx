/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { PostProps } from '../../models/Blog';
import PostPreview from './post-preview';

interface PostPreviewBlockProps {
  posts: PostProps[];
}
const PostPreviewsBlock: React.FC<PostPreviewBlockProps> = ({ posts = [] }) => {
  return (
    <div className="flex flex-col mt-[100px] max-w-[1240px] text-black w-full px-[20px] border-b-[1px] border-[#D9D9D9] pb-[100px]">
      <h3 className="font-drukMedium text-[18px] text-black mb-[20px]">More to read</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
        {posts.map((post, index) => (
          <PostPreview key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default PostPreviewsBlock;
