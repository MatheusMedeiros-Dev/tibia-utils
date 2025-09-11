import { useQuery } from "../hooks/useQuery";
import { useFetchPosts } from "../hooks/useFetchPosts";
import AppButton from "../components/AppButton";
import PostLayout from "../layouts/PostLayout";
import BackButtonBar from "../components/BackButtonBar";
import ErrorPage from "./ErrorPage";
import LoadingScreen from "./LoadingScreen";

const SearchResults = () => {
  const query = useQuery();
  const search = query.get("q");

  const { posts, error, loading } = useFetchPosts("posts", search);
  if (error) {
    return <ErrorPage errorMessage={error} />;
  }
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <BackButtonBar to="/" backBarStyle="toPost" />
      {posts && posts.length === 0 ? (
        <div className="flex justify-center">
          <div className="flex-col w-full sm:w-2/3 bg-overlay-bg rounded-lg">
            <div className="bg-content-bg m-2 rounded-sm">
              <p className="justify-center text-secondary-text font-semibold p-2">
                Desculpe, não encontramos nenhum post relacionado a essa
                pesquisa.
              </p>
            </div>
            <div className="flex justify-center">
              <AppButton label="Voltar" type="link" to="/" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {posts?.map((post) => (
            <PostLayout
              key={post.postId}
              postId={post.postId}
              createdBy={post.createdBy}
              createdAt={post.createdAt}
              title={post.title}
              imageUrl={post.imageUrl}
              body={post.body}
              tagsArray={post.tagsArray}
            />
          ))}
        </>
      )}
    </>
  );
};

export default SearchResults;
