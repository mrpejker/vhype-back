import type { NextPage } from 'next';
import PageLayout from '../../../components/page-layout';
import BlogEditor from '../../../features/blog';

const CreatePost: NextPage = () => {
  return (
    <PageLayout
      title="Create New Blog Post"
      category="Resources"
      pageName="Blog"
      description="Creating New Blog Post"
      colored
    >
      <section className="flex flex-col w-full max-w-[1240px]">
        <BlogEditor />
      </section>
    </PageLayout>
  );
};

export default CreatePost;
