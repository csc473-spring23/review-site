import { useState } from "react";
import { User } from "../types";
import { AuthContext, AuthContextType } from "./auth_context";
import { login, logout } from "./auth_service";
import { AuthResponse } from "../types/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();

  const loginHandler = (
    user: string,
    password: string,
    callback: VoidFunction
  ) => {
    login(user, password)
      .then(({ token }: AuthResponse) => {
        setUser({ username: user, loggedIn: true, token: token });
      })
      .finally(callback);
  };

  const logoutHandler = (callback: VoidFunction) => {
    logout()
      .then(() => setUser(undefined))
      .finally(callback);
  };

  const value: AuthContextType = {
    user: user,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
