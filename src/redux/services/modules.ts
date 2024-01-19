
import { api } from './api';

export const moduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Endpoint to create a new module
        createModule: builder.mutation({
            query: (moduleData) => ({
                url: '/add-module',
                method: 'POST',
                body: moduleData,
            }),
        }),

        // Endpoint to get all modules
        getModules: builder.query({
            query: () => '/modules',
        }),

        // Endpoint to get a specific module by moduleId
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
    useGetModulesQuery,
    useGetOneModuleQuery,
    useGetModuleExercisesQuery,
    useUpdateOneModuleMutation,
    useDeleteOneModuleMutation,
} = moduleApi;

export const {
    endpoints: {
        getModules,
        getOneModule,
        createModule,
        getModuleExercises,
        updateOneModule,
        deleteOneModule
    }
} = moduleApi


// export const moduleApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//         getAllModules: builder.query<Module, void>({
//             query: () => ({
//                 url: "/modules",
//                 method: "GET",
//             }),
//         }),
//         getOneModule: builder.query<Module, string>({
//             query: (id) => ({
//                 url: `/modules/${id}`,
//                 method: "GET",
//             }),
//         }),
//         addOneModule: builder.mutation<Module, string>({
//             query: (module) => ({
//                 url: "/add-module",
//                 method: "POST",
//                 body: module,
//             }),
//         }),
//         // editModule: builder.mutation<string, Module>({
//         //     query: (module) => ({
//         //         url: `/modules/edit/${module.id}`,
//         //         method: "PUT",
//         //     }),
//         // }),
//         // removeModule: builder.mutation<Module, string>({
//         //     query: (id) => ({
//         //         url: `/modules/delete/${id}`,
//         //         method: "DELETE",
//         //         body: {id}
//         //     }),
//         // }),

//     }),
// });


