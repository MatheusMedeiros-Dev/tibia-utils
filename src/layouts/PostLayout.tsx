import { Timestamp } from "firebase/firestore";
import LineDivider from "../components/LineDivider";

interface PostLayoutProps {
  postId: string;
  createdBy: string;
  createdAt: Timestamp;
  title: string;
  imageUrl: string;
  body: string;
  tagsArray: string[];
}

const PostLayout = ({
  postId,
  createdBy,
  createdAt,
  title,
  imageUrl,
  body,
  tagsArray,
}: PostLayoutProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full sm:w-2/3 mb-2 bg-overlay-bg rounded-lg">
        <div className="flex justify-between m-1.5 ml-1.5 items-center">
          <p
            className="flex font-bold text-xl text-username"
            title="Criado por este usuário"
          >
            {createdBy}
          </p>
          {createdAt && (
            <p className="flex text-create-at items-center">
              Publicado em:{" "}
              {new Date(createdAt.seconds * 1000).toLocaleDateString()}
            </p>
          )}
        </div>

        <LineDivider direction="horizontal" />

        <h1
          className="font-medium text-2xl m-1 ml-1.5 text-primary-text"
          title="Título da postagem"
        >
          {title}
        </h1>
        <img src={imageUrl} alt={title} className="text-primary-text" />
        <p className="m-1.5 text-primary-text" title="comentário sobre o post">
          {body}
        </p>
        <LineDivider direction="horizontal" />
        <div className="flex ml-1.5 my-2.5">
          {tagsArray?.map((tag: string) => (
            <p
              key={`${postId}-${tag}`}
              className="bg-tag-bg text-tag-text rounded-md m-1 p-1"
              title="tag"
            >
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostLayout;
