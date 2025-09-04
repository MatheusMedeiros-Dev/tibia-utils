import { useParams } from "react-router-dom";
import { useFetchPost } from "../hooks/useFetchPost";
import PostLayout from "../layouts/PostLayout";
import BackButtonBar from "../components/BackButtonBar";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";

const ViewPost = () => {
  const { postId } = useParams();
  if (!postId) {
    return <ErrorPage errorMessage="Post não encontrado." />;
  }
  const { post, loading, error } = useFetchPost("posts", postId);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {post && (
        <>
          <BackButtonBar to="/dashboard/posts" />

          <PostLayout
            postId={post.postId}
            createdBy={post.createdBy}
            createdAt={post.createdAt}
            title={post.title}
            imageUrl={post.imageUrl}
            body={post.body}
            tagsArray={post.tagsArray}
          />
        </>
      )}
    </>
  );
};

export default ViewPost;
