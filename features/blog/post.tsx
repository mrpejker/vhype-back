/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useWalletSelector } from '../../contexts/WalletSelectorContext';
import CalendarIcon from '../../components/icons/CalendarIcon';
import PostEditButtons from '../../components/post-edit-buttons';
import PostCategories from '../../components/post-categories';

interface BlogPostProps {
  thumbnail: string;
  content: string;
  categories: string[];
  title: string;
  author: string;
  date: string;
}
const BlogPost: React.FC<BlogPostProps> = ({ thumbnail, content, title, author, date, categories = [] }) => {
  const { accountId } = useWalletSelector();
  const deletePost = () => {
    //
  };
  return (
    <section className="flex flex-col md:flex-row-reverse justify-center w-full max-w-[1240px] px-[20px] gap-[20px]">
      <aside className="flex w-full mb-[40px] flex-col md:basis-1/4 p-[20px] bg-[#ecebeb] rounded-[20px] md:sticky h-fit top-[120px]">
        <picture>
          <source srcSet={thumbnail} media="(orientation: portrait)" />
          <img src={thumbnail} alt="" className="rounded-[10px]" />
        </picture>
        <div className="flex flex-col w-full gap-1 my-[20px]">
          <Link href={`/vranda/${author}`} className="flex gap-2 items-center hover:underline">
            <img
              src="/ninja2.png"
              alt="avatar"
              className="border-[1px] border-[#FB40FF] w-[30px] h-[30px] rounded-full object-cover"
            />{' '}
            {author}
          </Link>
          <span className="flex items-center gap-2">
            <CalendarIcon />
            {date}
          </span>
        </div>
        <PostCategories categories={categories} />
        {accountId === author && <PostEditButtons deleteCallback={deletePost} editCallback={deletePost} />}
      </aside>
      <article className="flex flex-col w-full md:basis-4/5">
        {/* <h1 className="font-drukMedium text-[32px] text-black mb-[20px]">{title}</h1> */}

        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </section>
  );
};

export default BlogPost;
