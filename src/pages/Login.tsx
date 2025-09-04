import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import InputField from "../components/InputField";
import FormLayout from "../layouts/FormLayout";
import AppButton from "../components/AppButton";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authError, loading, login } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = {
      email,
      password,
    };

    await login(user);
  };
  return (
    <FormLayout title="Faça seu login" onSubmit={handleSubmit}>
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
      <AppButton
        type="submit"
        label={loading ? "Logando..." : "Logar"}
        buttonStyle={loading ? "loading" : "default"}
        error={authError}
      />
    </FormLayout>
  );
};

export default Login;
