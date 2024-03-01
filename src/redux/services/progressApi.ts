import { api } from "./api";

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  progress: number;
  completed: boolean;
}

export interface UserModuleProgress {
  userId: string;
  modules: ModuleProgress[];
}

export interface ExerciseProgress {
  exerciseId: string;
  exerciseName: string;
  progress: number;
  completed: boolean;
}

export interface UserExerciseProgress {
  userId: string;
  exercises: ExerciseProgress[];
}

export const progressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserModuleProgress: builder.query<UserModuleProgress, void>({
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
    getUserExerciseProgress: builder.mutation({
      query: ({ userId, progress }) => ({
        url: `progress/update/${userId}`,
        method: "PUT",
        body: progress,
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
