/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import ActiveLink from '../../components/active-link';
import { mockNaomiPost, mockPostPreview } from '../../mockData/mockBlogPost';
import { getFirestoreCollectionData } from '../../utils/firebase';
import PostPreview from '../../features/blog/post-preview';
import { PostProps } from '../../models/Blog';
import PageLayout from '../../components/page-layout';

export async function getServerSideProps() {
  const mediumPosts = await (
    await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@vSelf_Project')
  )?.json();
  const { items } = mediumPosts;
  const firebasePosts = await getFirestoreCollectionData('feed');
  return {
    props: {
      posts: [mockPostPreview, mockNaomiPost, ...firebasePosts, ...items],
    },
  };
}

interface BlogProps {
  posts: PostProps[];
}

const BlogPage: NextPage<BlogProps> = ({ posts = [mockPostPreview, mockNaomiPost] }) => {
  return (
    <PageLayout title="vSelf Blog Posts" pageName="Blog" category="Resources" description="Our Blogs" colored>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mb-[40px] rounded-lg max-w-[1240px] text-black">
        {posts.map((post, index) => (
          <PostPreview key={index} {...post} />
        ))}
      </div>
      <div className="flex items-center justify-center w-full ">
        <div className="w-full max-w-[1240px] bg-[url(/lnd_bl2.png)] p-[20px] bg-no-repeat bg-center bg-cover rounded-lg">
          <div className="flex flex-col z-20 w-full max-w-[1040px] md:justify-between md:items-center mx-auto md:flex-row">
            <div className="flex md:mb-0 md:w-2/3 mb-[70px]">
              <h2 className="text-[25px] font-grotesk text-white uppercase ">
                check out our training <br /> programme on how to use <br /> the app
              </h2>
            </div>
            <div className="flex justify-center md:w-1/2">
              <ActiveLink
                href="/faq"
                className="self-center p-[20px] rounded-full w-auto py-2 bg-[#41F092] border-[#41F092] border-[1px] hover:bg-transparent transition-colors"
              >
                <span className="text-black hover:text-[#41F092]">Explore vSelf</span>
              </ActiveLink>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPage;
