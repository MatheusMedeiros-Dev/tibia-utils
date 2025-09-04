import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { type User } from "firebase/auth";
import { type ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  user: User | null;
};
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
