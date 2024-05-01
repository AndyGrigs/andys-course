import { IUser } from "../../types";
import { api } from "./api";

export type UserData = Omit<IUser, "id">;
//type ResponseLoginData = User & { token: string };
type ResponseLoginData = IUser;

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    updateCode: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/auth/update",
        method: "PUT",
        body: userData,
      }),
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useUpdateCodeMutation,
} = authApi;

export const {
  endpoints: { login, register, current, updateCode },
} = authApi;
