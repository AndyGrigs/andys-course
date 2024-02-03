import { api } from './api';
import { IExercise } from '../../types';

export const exercisesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getExercises: builder.query<IExercise, void>({
            query: (exId) => ({
                url: `/modules/${exId}/exercises`,
                method: "GET",
            }),
        }),
        getOneExercises: builder.query<IExercise, void>({
            query: (exId) => ({
                url: `/exercises/${exId}`,
                method: "GET",
            }),
        }),

    }),
});

export const { useGetExercisesQuery } = exercisesApi
export const {
    endpoints: { getExercises, getOneExercises },
} = exercisesApi;