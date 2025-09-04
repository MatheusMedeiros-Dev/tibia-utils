import { type FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePost } from "../hooks/useUpdatePost";
import { useFetchPost } from "../hooks/useFetchPost";
import InputField from "../components/InputField";
import BackButtonBar from "../components/BackButtonBar";
import AppButton from "../components/AppButton";
import FormLayout from "../layouts/FormLayout";
import ErrorPage from "./ErrorPage";
import Modal from "../components/Modal";

type EditedPost = {
  title: string;
  imageUrl: string;
  body: string;
  tagsArray: string[];
};

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const {
    updatePost,
    loading: loadingFromUpdate,
    error: errorFromUpdate,
  } = useUpdatePost("posts");
  if (!postId) {
    return <ErrorPage errorMessage="Post não encontrado" />;
  }
  const { post, error } = useFetchPost("posts", postId);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<FormEvent>();

  const handleRequestSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPendingEvent(e);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setPendingEvent(undefined);
  };
  const handleModalConfirm = () => {
    if (pendingEvent) handleSubmit(pendingEvent);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title || !imageUrl || !tags || !body) {
      return setFormError("Por favor, preencha todos os campos.");
    }
    try {
      new URL(imageUrl);
    } catch (err) {
      return setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray: string[] = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    const editedPost: EditedPost = { title, imageUrl, body, tagsArray };

    await updatePost(postId!, editedPost);
    navigate("/dashboard/posts");
  };
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setBody(post.body || "");
      setImageUrl(post.imageUrl || "");
      const textTags = post.tagsArray ? post.tagsArray.join(", ") : "";
      setTags(textTags || "");
    }
  }, [post]);

  return (
    <>
      {post && (
        <>
          <BackButtonBar to="/dashboard/posts" width="w-1/3" />
          <FormLayout
            mode="withBar"
            title="Editar post"
            onSubmit={handleRequestSubmit}
          >
            <div className="">
              <InputField
                label="Título:"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
              />

              <InputField
                label="Url da imagem:"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Coloque a URL da imagem"
                required
              />

              <div className="w-[100px]">
                <p className="font-semibold text-primary-text">Preview:</p>
                <img src={imageUrl || undefined} alt="Preview" />
              </div>

              <InputField
                label="Conteúdo:"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Conteúdo do post"
                required
              />

              <InputField
                label="Tags:"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Insira as tags"
                required
              />
            </div>
            <AppButton
              label={loadingFromUpdate ? "Editando..." : "Editar"}
              type="submit"
              buttonStyle={loadingFromUpdate ? "loading" : "submit"}
              error={formError || errorFromUpdate}
            />

            <Modal
              modalIsOpen={isModalOpen}
              modalOnClose={handleModalCancel}
              modalText="Tem certeza que deseja salvar as alterações?"
              modalOnClickClose={handleModalCancel}
              modalOnClickConfirm={handleModalConfirm}
            />
          </FormLayout>
        </>
      )}
    </>
  );
};

export default EditPost;
