import { type FormEvent, useState } from "react";
import { useInsertPost } from "../hooks/useInsertPost";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import FormLayout from "../layouts/FormLayout";
import AppButton from "../components/AppButton";

type NewPost = {
  title: string;
  imageUrl: string;
  body: string;
  tagsArray: string[];
};
const CreatePost = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const navigate = useNavigate();
  const { insertPost, error, loading } = useInsertPost("posts");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title || !imageUrl || !tags || !body) {
      return setFormError("Por favor, preencha todos os campos.");
    }
    try {
      new URL(imageUrl);
    } catch {
      return setFormError("A imagem precisa ser uma URL.");
    }

    const tagsArray: string[] = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    const newPost: NewPost = { title, imageUrl, body, tagsArray };

    await insertPost(newPost);
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <FormLayout title="Crie seu post" onSubmit={handleSubmit}>
        <div className="">
          <InputField
            label="Título:"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do post"
          />
          <InputField
            label="Url da imagem:"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Cole a URL da imagem"
          />
          <InputField
            label="Conteúdo:"
            type="textarea"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Escreva algo sobre o post"
          />
          <InputField
            label="Tags:"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separe as tags com vírgula"
          />
        </div>

        <AppButton
          label={loading ? "Postando..." : "Postar"}
          type="submit"
          buttonStyle={loading ? "loading" : "submit"}
          error={formError || error}
        />
      </FormLayout>
    </div>
  );
};

export default CreatePost;
