import { api } from "./api";
import { ModuleProgress, ExerciseProgress } from "../../types";
export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserModuleProgress: builder.query<
      ModuleProgress[],
      string | undefined
    >({
      query: (userId) => ({
        url: `/progress/module/${userId}`,
        method: "GET",
      }),
    }),

    getUserModuleProgress: builder.query<
      ModuleProgress,
      { userId: string; moduleId: string }
    >({
      query: ({ userId, moduleId }) => ({
        url: `/progress/module/${userId}/${moduleId}`,
        method: "GET",
      }),
    }),

    createUserModuleProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/module/create/${userId}`,
        method: "POST",
        body: progress,
      }),
    }),

    updateUserModuleProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/module/update/${userId}`,
        method: "PUT",
        body: progress,
      }),
    }),

    createUserExerciseProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/exercise/create/${userId}`,
        method: "POST",
        body: progress,
      }),
    }),

    updateUserExerciseProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/exercise/update/${userId}`,
        method: "PUT",
        body: progress,
      }),
    }),
  }),
});

export const {
  useGetUserModuleProgressQuery,
  useUpdateUserModuleProgressMutation,
  useUpdateUserExerciseProgressMutation,
  useCreateUserExerciseProgressMutation,
  useCreateUserModuleProgressMutation,
} = progressApi;
