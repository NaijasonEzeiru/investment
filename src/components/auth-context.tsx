"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  referralCode: string;
  role: string;
}

interface IContext {
  user: IUser | null;
  loading: boolean;
  setUser?: Dispatch<SetStateAction<IUser | null>>;
  authChecking: boolean;
  signout?: () => Promise<void>;
  checkUserLoggedIn?: () => Promise<void>;
}

const AuthContext = createContext<IContext>({
  user: null,
  loading: false,
  authChecking: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const router = useRouter();

  const signout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoading(false);
    setUser(null);
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
      if (res.ok) {
        setUser(data);
        setAuthChecking(false);
      } else {
        console.log("failed");
        setUser(null);
        setAuthChecking(false);
      }
    } catch (error) {
      setUser(null);
      console.log("Auth check failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authChecking,
        setUser,
        signout,
        checkUserLoggedIn,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
