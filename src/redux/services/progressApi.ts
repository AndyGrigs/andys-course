import { ExerciseProgress, ModuleProgress } from "../../types";
import { api } from "./api";

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

    updateUserModuleProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/module/update/${userId}`,
        method: "PUT",
        body: progress,
      }),
    }),

    getUserExerciseProgress: builder.query<
      ExerciseProgress,
      { userId: string; exerciseId: string }
    >({
      query: ({ userId, exerciseId }) => ({
        url: `/progress/exercise/${userId}/${exerciseId}`,
        method: "GET",
      }),
    }),

    getAllUserExerciseProgress: builder.query<ExerciseProgress[], void>({
      query: (userId) => ({
        url: `/progress/exercise/${userId}`,
        method: "GET",
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
  useGetAllUserModuleProgressQuery,
  useGetUserModuleProgressQuery,
  useUpdateUserModuleProgressMutation,
  useGetAllUserExerciseProgressQuery,
  useGetUserExerciseProgressQuery,
  useUpdateUserExerciseProgressMutation,
} = progressApi;
