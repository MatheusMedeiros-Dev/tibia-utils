import { useFetchPosts } from "../hooks/useFetchPosts";
import PostLayout from "../layouts/PostLayout";

import LoadingScreen from "./LoadingScreen";
import AppButton from "../components/AppButton";
import SearchBar from "../components/SearchBar";
import { useQuery } from "../hooks/useQuery";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Home = () => {
  const urlQuery = useQuery();
  const search = urlQuery.get("q");
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  const { posts, loading, error } = useFetchPosts("posts", search);
  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }
  if (posts?.length === 0) {
    return (
      <div className="flex justify-center">
        <div className="w-[100%] sm:w-[80%] bg-overlay-bg rounded-b-lg mb-2">
          <p className="bg-content-bg text-secondary-text py-4 m-2 mb-0 text-center rounded-lg font-medium">
            Ainda não há postagens. Seja o primeiro a postar!
          </p>
          <div className="flex justify-center">
            <AppButton to="/posts/create" type="link" label="Postar agora" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {posts && (
        <div className="flex flex-col justify-center items-center">
          <SearchBar
            onSubmit={handleSubmit}
            onChange={(e) => setQuery(e.target.value)}
            inputValue={query}
          />
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
        </div>
      )}
    </>
  );
};

export default Home;
