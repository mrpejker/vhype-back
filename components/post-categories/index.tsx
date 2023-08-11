interface PostCategoriesProps {
  categories: string[];
}
const PostCategories: React.FC<PostCategoriesProps> = ({ categories }) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {categories.map((category, index) => (
        <span key={index} className="p-[5px] bg-[#D9D9D9] m-1 rounded-[5px] cursor-pointer">
          {category}
        </span>
      ))}
    </div>
  );
};

export default PostCategories;
