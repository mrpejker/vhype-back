export interface PostProps {
  title: string;
  link: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

export interface NewPostState {
  title: string;
  content: string;
  categories: string[];
}
