import * as React from "react";
import { createContext, useEffect, useState } from "react";
import { getUserInfo, IUser } from "../utils/auth.ts";

interface IAuthContext {
  user: IUser | null;
}

const AuthContext = createContext<IAuthContext | null>(null);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      setUser(data as IUser);
    })();
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
