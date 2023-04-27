// What Auth-related functionality do we potentially need deep in our tree?
// 1) Who is the user? Are they logged in?
// 2) Login handler
// 3) Logout handler

import { createContext, useContext } from "react";
import { User } from "../types";
import { login } from "./auth_service";

export interface AuthContextType {
  user?: User;
  login: (username: string, password: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!);
/* {
  user: null,
  login: (username: string, password: string, callback: VoidFunction) => {
    void login(username, password).then(callback);
  },
  logout: logout,
}*/

// I can use this by calling `useContext(AuthContext)` in my components
// or... I can define my own hook
export function useAuth() {
  return useContext(AuthContext);
}
