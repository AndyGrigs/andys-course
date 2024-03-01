import { ExerciseProgress, ModuleProgress } from "../../types";
import { api } from "./api";

export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserModuleProgress: builder.query<ModuleProgress, void>({
      query: (userId) => ({
        url: `/progress/${userId}`,
        method: "GET",
      }),
    }),
    updateUserModuleProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/update/${userId}`,
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

    updateUserExerciseProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/update/${userId}`,
        method: "PUT",
        body: progress,
      }),
    }),
  }),
});

export const {
  useGetUserModuleProgressQuery,
  useUpdateUserModuleProgressMutation,
} = progressApi;
