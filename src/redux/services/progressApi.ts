/* eslint-disable @typescript-eslint/ban-ts-comment */
import { api } from "./api";
import { ModuleProgress, ExerciseProgress } from "../../types";

// Define tags for the queries
// export const USER_EXERCISE_PROGRESS_QUERY_TAG = 'UserExerciseProgress';

// type UserExerciseProgressTag = { type: 'UserExerciseProgress', id: 'LIST' };
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
      { userId: string; moduleId: string; moduleName: string; progress: number }
    >({
      query: ({ userId, moduleId, moduleName, progress }) => ({
        url: `progress/module/create/${userId}`,
        method: "POST",
        body: { moduleId, moduleName, progress },
      }),
    }),

    updateUserModuleProgress: builder.mutation<ModuleProgress, { userId: string, moduleId: string, progress: number }>({
      query: ({ userId, moduleId, progress }) => ({
        url: `progress/module/update/${userId}`,
        method: "PUT",
        body: { moduleId, progress },
      }),
    }),

    getAllUserExerciseProgress: builder.query<
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
      { userId: string; exerciseId: string }
    >({
      query: ({ userId, exerciseId }) => ({
        url: `/progress/exercise/${userId}/${exerciseId}`,
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
      { userId: string; exerciseId: string, answers: object, progress: number }
    >({
      query: ({ userId, exerciseId, answers, progress }) => ({
        url: `progress/exercise/update/${userId}`,
        method: "PUT",
        body: { exerciseId, answers, progress },
      }),
    }),

    updateUserExerciseCompleted: builder.mutation<
      ExerciseProgress,
      { userId: string; exerciseId: string, completed: boolean }
    >({
      query: ({ userId, exerciseId, completed }) => ({
        url: `progress/exercise/update/completed/${userId}`,
        method: "PUT",
        body: { exerciseId, completed },
      }),
    }),
  }),
});

export const {
  useGetAllUserModuleProgressQuery,
  useGetAllUserExerciseProgressQuery,
  useGetUserModuleProgressQuery,
  useGetUserExerciseProgressQuery,
  useUpdateUserModuleProgressMutation,
  useUpdateUserExerciseProgressMutation,
  useCreateUserExerciseProgressMutation,
  useCreateUserModuleProgressMutation,
  useUpdateUserExerciseCompletedMutation
} = progressApi;

export const { endpoints: {
  updateUserExerciseProgress,
  updateUserModuleProgress,
  updateUserExerciseCompleted
} } = progressApi;