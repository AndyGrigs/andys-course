import { Module } from "../../types";
import { api } from "./api";


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.query<Module, void>({
            query: (modulesData) => ({
                url: "/modules",
                method: "GET",
                body: modulesData,
            }),
        }),

    }),
});
