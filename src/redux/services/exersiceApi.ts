import { api } from "./api";
import { IExerciseResponse } from "../../types";

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<IExerciseResponse, string | undefined>({
      query: (exId) => ({
        url: `/modules/${exId}/exercises`,
        method: "GET",
      }),
    }),
    getOneExercises: builder.query<IExerciseResponse, void>({
      query: (exId) => ({
        url: `/exercises/${exId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetExercisesQuery } = exercisesApi;
export const {
  endpoints: { getExercises, getOneExercises },
} = exercisesApi;
