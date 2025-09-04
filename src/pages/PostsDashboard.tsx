import { useAuthValue } from "../context/AuthContext";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { useDeletePost } from "../hooks/useDeletePost";
import LineDivider from "../components/LineDivider";

import AppButton from "../components/AppButton";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import Modal from "../components/Modal";

const PostsDashboard = () => {
  const { user } = useAuthValue();
  const uid = user?.uid;
  const { posts, loading, error } = useFetchPosts("posts", null, uid);

  const {
    deletePost,
    loading: loadingFromDelete,
    error: errorFromDelete,
  } = useDeletePost("posts");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleDeletePost = (id: string) => setPostToDelete(id);
  const handleModalClose = () => setPostToDelete(null);
  const handleModalConfirm = async () => {
    if (postToDelete) {
      await deletePost(postToDelete);
      setPostToDelete(null);
    }
  };
  if (error) {
    return <ErrorPage errorMessage={error} />;
  }
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full sm:w-[50%] bg-overlay-bg text-primary-text mb-2 rounded-b-lg">
        <div className="m-4 mb-0">
          <h1 className="text-center font-bold text-lg p-2 bg-card-bg rounded-md shadow-md mb-4">
            Gerencie seus posts
          </h1>

          {posts?.length === 0 ? (
            <div className="flex justify-center">
              <div className="w-full sm:w-2/3 mb-2">
                <p className="bg-content-bg text-secondary-text py-4 m-2 mb-0 text-center rounded-lg font-medium">
                  Você ainda não postou nada. Faça seu primeiro post!
                </p>
                <div className="flex justify-center">
                  <AppButton
                    to="/posts/create"
                    type="link"
                    label="Postar agora"
                  />
                </div>
              </div>
            </div>
          ) : (
            posts?.map((post) => (
              <div key={post.postId} className="bg-content-bg rounded-lg mb-3">
                <div className="m-2 mb-0">
                  <div className="flex justify-between">
                    <h1
                      className="flex font-semibold text-lg text-secondary-text items-center"
                      title="Título"
                    >
                      {post.title}
                    </h1>
                    {post.createdAt && (
                      <p className="flex text-create-at-dashboard text-sm items-center">
                        Publicado em:{" "}
                        {new Date(
                          post.createdAt.seconds * 1000
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <LineDivider />
                  <div className="w-full">
                    <p className="font-semibold my-1 text-secondary-text">
                      Preview:
                    </p>
                    <img
                      src={post.imageUrl || undefined}
                      alt="Preview"
                      className="mb-1.5"
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <AppButton
                      type="link"
                      label="Ver"
                      to={`/view/${post.postId}`}
                    />
                    <AppButton
                      type="link"
                      label="Editar"
                      to={`/posts/edit/${post.postId}`}
                    />

                    <AppButton
                      label={loadingFromDelete ? "Excluindo..." : "Excluir"}
                      type="button"
                      buttonStyle={
                        loadingFromDelete ? "loadingDelete" : "delete"
                      }
                      error={errorFromDelete}
                      onClick={() => handleDeletePost(post.postId)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
          <Modal
            modalIsOpen={postToDelete !== null}
            modalOnClose={handleModalClose}
            modalText="Você tem certeza que deseja deletar o post?"
            modalOnClickClose={handleModalClose}
            modalOnClickConfirm={handleModalConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default PostsDashboard;
