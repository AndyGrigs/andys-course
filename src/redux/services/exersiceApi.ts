import { api } from "./api";
import { IExerciseResponse } from "../../app/types";

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<IExerciseResponse, string | undefined>({
      query: (moduleId) => ({
        url: `/modules/${moduleId}/exercises`,
        method: "GET",
      }),
    }),
    getOneExercises: builder.query<IExerciseResponse, string | undefined>({
      query: (exId) => ({
        url: `/exercises/${exId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetExercisesQuery, useGetOneExercisesQuery } = exercisesApi;
export const {
  endpoints: { getExercises, getOneExercises },
} = exercisesApi;
