import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../types/auth";

export function login(
  username: string,
  password: string
): Promise<AuthResponse> {
  const authResponse = axios.post("/login", {
    username: username,
    password: password,
  });
  return authResponse
    .then((resp: AxiosResponse<AuthResponse, unknown>) => {
      if (resp.status === 200) {
        // we should get a token back
        return resp.data;
      } else {
        return Promise.reject("login failed");
      }
    })
    .catch((reason) => {
      console.log(reason);
      // login failed;
      return Promise.reject(reason);
    });
}

export const logout = () => {
  return axios.post("/logout");
};
