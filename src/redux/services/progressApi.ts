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

    createUserModuleProgress: builder.mutation<
      ModuleProgress,
      { userId: string; progress: object }
    >({
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

    getAllUserExerciseeProgress: builder.query<
      ExerciseProgress[],
      string | undefined
    >({
      query: (userId) => ({
        url: `/progress/exercise/${userId}`,
        method: "GET",
      }),
    }),

    getUserExerciseProgress: builder.query<
      ExerciseProgress,
      { userId: string; moduleId: string }
    >({
      query: ({ userId, moduleId }) => ({
        url: `/progress/exercise/${userId}/${moduleId}`,
        method: "GET",
      }),
    }),
    createUserExerciseProgress: builder.mutation<
      ExerciseProgress,
      { userId: string; progress: object }
    >({
      query: ({ userId, progress }) => ({
        url: `progress/exercise/create/${userId}`,
        method: "POST",
        body: progress,
      }),
    }),

    updateUserExerciseProgress: builder.mutation<
      ExerciseProgress,
      { userId: string; exerciseId: string, progress: number }
    >({
      query: ({ userId, exerciseId, progress }) => ({
        url: `progress/exercise/update/${userId}`,
        method: "PUT",
        body: { exerciseId, progress },
      }),
    }),
  }),
});

export const {
  useGetUserModuleProgressQuery,
  useGetUserExerciseProgressQuery,
  useUpdateUserModuleProgressMutation,
  useUpdateUserExerciseProgressMutation,
  useCreateUserExerciseProgressMutation,
  useCreateUserModuleProgressMutation,
} = progressApi;

export const { endpoints: {
  updateUserExerciseProgress,
  updateUserModuleProgress
} } = progressApi;