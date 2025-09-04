import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import InputField from "../components/InputField";
import FormLayout from "../layouts/FormLayout";
import AppButton from "../components/AppButton";

type NewUser = {
  displayName: string;
  email: string;
  password: string;
};

const Register = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  const { createUser, authError, loading } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!displayName || !email || !password || !confirmPassword) {
      return setFormError("Por favor, preencha todos os campos.");
    }
    if (password !== confirmPassword) {
      return setFormError("As senhas devem ser iguais");
    }
    const newUser: NewUser = {
      displayName,
      email,
      password,
    };
    await createUser(newUser);
  };

  return (
    <FormLayout title="Criar conta" onSubmit={handleSubmit}>
      <InputField
        label="Usuário:"
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Digite um nome de usuário"
      />

      <InputField
        label="Email:"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu e-mail"
        autoComplete="email"
      />

      <InputField
        label="Senha:"
        type="password"
        name="senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Digite sua senha"
        autoComplete="current-password"
      />

      <InputField
        label="Confirme sua senha:"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirme sua senha"
        autoComplete="current-password"
      />

      <AppButton
        label={loading ? "Criando..." : "Criar"}
        type="submit"
        buttonStyle={loading ? "loading" : "default"}
        error={formError || authError}
      />
    </FormLayout>
  );
};

export default Register;
