import { LOGIN, REGISTER } from "./request";
import { useRouter, useContext } from "@nuxtjs/composition-api";
import { RegisterInfoType, LoginInfoType, UserInfo } from "./types";
import { state } from "./index";
import jwt from "jsonwebtoken";

export function initAuth() {
  const context = useContext();
  const verifyJWT = (token: string) => {
    return jwt.verify(token, "thisismyuniqesecretkey") as UserInfo;
  };

  const token: string = context.app.$apolloHelpers.getToken("apollo-token");
  if (token) {
    const userInfo = verifyJWT(token);
    state.usernameL = userInfo.username;
    state.userId = userInfo._id;
    state.token = token;
  }
}

export function useLogin(): {
  getLogin: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  getRegister: (
    username: string,
    password: string,
    email: string
  ) => Promise<void>;
  logout(): void;
} {
  const context = useContext();
  const router = useRouter();
  const client = context.app.apolloProvider.defaultClient;
  const getLogin = async (
    username: string,
    password: string,
    email: string
  ): Promise<void> => {
    const payload = {
      username,
      email,
      password,
    };

    try {
      const response: LoginInfoType = await client.mutate({
        mutation: LOGIN,
        variables: payload,
      });
      await context.app.$apolloHelpers.onLogin(
        response.data.login.token,
        "_",
        ""
      );

      state.usernameL = response.data.login.username;
      state.userId = response.data.login._id;
      state.token = response.data.login.token;

      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const getRegister = async (
    username: string,
    password: string,
    email: string
  ): Promise<void> => {
    const payload = {
      username,
      email,
      password,
    };
    try {
      const response: RegisterInfoType = await client.mutate({
        mutation: REGISTER,
        variables: payload,
      });
      if (process.browser) {
        await context.app.$apolloHelpers.onLogin(
          response.data.createUser.token,
          "_",
          ""
        );

      }
      state.usernameL = response.data.createUser.username;
      state.userId = response.data.createUser._id;
      state.token = response.data.createUser.token;
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    state.token = "";
    context.app.$apolloHelpers.onLogout("apollo-token");
    router.push("/login");
  };
  return { getLogin, getRegister, logout };
}
