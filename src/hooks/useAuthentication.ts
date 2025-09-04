import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";

export const useAuthentication = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createUser = async (data: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    setAuthError(null);
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });
    } catch (error: any) {
      let systemErrorMessage;

      if (error.code === "auth/weak-password") {
        systemErrorMessage = "A senha deve conter pelo menos 6 caracteres.";
      } else if (error.code === "auth/email-already-in-use") {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro ao criar o cadastro. Tente novamente mais tarde.";
      }
      setAuthError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setAuthError(null);
    setLoading(true);
    try {
      await signOut(auth);
    } catch {
      setAuthError(
        "Ocorreu um erro ao encerrar a sessão. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    if (!data.email) {
      setAuthError("Digite seu email.");
      return null;
    }
    if (!data.password) {
      setAuthError("Digite sua senha.");
      return null;
    }
    setLoading(true);
    setAuthError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      let systemErrorMessage;

      if (error.code === "auth/invalid-credential") {
        systemErrorMessage = "E-mail ou senha incorreta.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro ao efetuar o login. Tente novamente mais tarde.";
      }

      setAuthError(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, authError, loading, logout, login };
};
