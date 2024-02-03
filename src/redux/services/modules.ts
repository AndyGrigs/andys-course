
import { Module } from '../../types';
import { api } from './api';

export const moduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createModule: builder.mutation({
            query: (moduleData) => ({
                url: '/add-module',
                method: 'POST',
                body: moduleData,
            }),
        }),


        getAllModules: builder.query<Module[], void>({
            query: () => ({
                url: "/modules",
                method: "GET",
            }),
        }),

        getOneModule: builder.query({
            query: (moduleId) => `/modules/${moduleId}`,
        }),

        // Endpoint to get exercises for a specific module
        getModuleExercises: builder.query({
            query: (moduleId) => `/modules/${moduleId}/exercises`,
        }),

        // Endpoint to update a specific module by moduleId
        updateOneModule: builder.mutation({
            query: ({ moduleId, ...updateData }) => ({
                url: `/modules/edit/${moduleId}`,
                method: 'PUT',
                body: updateData,
            }),
        }),

        // Endpoint to delete a specific module by moduleId
        deleteOneModule: builder.mutation({
            query: (moduleId) => ({
                url: `/modules/delete/${moduleId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useCreateModuleMutation,
    useGetAllModulesQuery,
    useGetOneModuleQuery,
    useGetModuleExercisesQuery,
    useUpdateOneModuleMutation,
    useDeleteOneModuleMutation,
} = moduleApi;

export const {
    endpoints: {
        getAllModules,
        getOneModule,
        createModule,
        getModuleExercises,
        updateOneModule,
        deleteOneModule
    }
} = moduleApi



