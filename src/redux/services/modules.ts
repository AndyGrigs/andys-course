import { Module } from "../../types";
import { api } from "./api";


export const moduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllModules: builder.query<Module, void>({
            query: () => ({
                url: "/modules",
                method: "GET",
            }),
        }),
        getOneModule: builder.query<Module, string>({
            query: (id) => ({
                url: `/modules/${id}`,
                method: "GET",
            }),
        }),
        addOneModule: builder.mutation<Module, string>({
            query: (module) => ({
                url: "/add-module",
                method: "POST",
                body: module,
            }),
        }),
        // editModule: builder.mutation<string, Module>({
        //     query: (module) => ({
        //         url: `/modules/edit/${module.id}`,
        //         method: "PUT",
        //     }),
        // }),
        // removeModule: builder.mutation<Module, string>({
        //     query: (id) => ({
        //         url: `/modules/delete/${id}`,
        //         method: "DELETE",
        //         body: {id}
        //     }),
        // }),

    }),
});

export const { useGetAllModulesQuery, useLazyGetAllModulesQuery, useAddOneModuleMutation } = moduleApi

export const {
    endpoints: {
        getAllModules,
        getOneModule,
        addOneModule,
    }
} = moduleApi