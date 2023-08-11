import type { GetServerSidePropsContext, NextPage } from 'next';
import { getFirestoreCollectionData, getFirestoreDocumentData } from '../../../utils/firebase';
import PageLayout from '../../../components/page-layout';
import BlogPost from '../../../features/blog/post';
import PostPreviewsBlock from '../../../features/blog/post-block';
import { PostProps } from '../../../models/Blog';

interface PostPageProps {
  title: string;
  content: string;
  thumbnail: string;
  author: string;
  date: string;
  posts: PostProps[];
  categories: string[];
}

const PostPage: NextPage<PostPageProps> = ({ title, content, thumbnail, author, posts, date, categories = [] }) => {
  // Meta description in the Head tag of the HTML document on page
  // console.log(String(content).replace(/<[^>]+>/g, ''));
  const excerpt =
    String(content)
      .replace(/<[^>]+>/g, '')
      .substring(0, 140) + '...';

  return (
    <PageLayout
      title={title}
      pageName="Blog"
      category="Resources"
      description={excerpt}
      image={thumbnail}
      author={author}
      colored
    >
      <div className="flex w-full h-[300px] items-center bg-[#ecebeb] bg-[url(/59.png)] bg-no-repeat bg-left bg-cover rounded-[20px] max-w-[1240px] px-[20px] mb-[40px]">
        <h1 className="font-drukMedium uppercase text-[42px] text-[#fb40ff] mb-[20px]">{title}</h1>
      </div>
      <BlogPost
        title={title}
        content={content}
        thumbnail={thumbnail}
        author={author}
        date={date}
        categories={categories}
      />
      <PostPreviewsBlock posts={posts} />
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query, res }: GetServerSidePropsContext) => {
  const { slug } = query;
  const post = await getFirestoreDocumentData('blog', String(slug));
  const firebasePosts = await getFirestoreCollectionData('feed');

  if (!post) {
    return { props: {} };
  }
  return {
    props: {
      title: String((post as any).title),
      content: String((post as any).content),
      thumbnail: String((post as any).thumbnail),
      categories: (post as any).categories ? (post as any).categories : [],
      author: String((post as any).author),
      date: String((post as any).date),
      posts: firebasePosts.slice(0, 4),
    },
  };
};

export default PostPage;
