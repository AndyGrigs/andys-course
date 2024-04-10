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
      { userId: string; exerciseId: string }
    >({
      query: ({ userId, exerciseId }) => ({
        url: `/progress/exercise/${userId}/${exerciseId}`,
        method: "GET",
      }),
      //@ts-ignore
      // providesTags: (result, error, { userId, exerciseId }) => [{ type: 'UserExerciseProgress', id: '7cj7echs0wq0' } as UserExerciseProgressTag],
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
      //@ts-ignore
      // invalidatesTags: [{ type: 'UserExerciseProgress', id: '7cj7echs0wq0' }],

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