import { IExercise } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { exercisesApi } from "../services/exersiceApi";
import { RootState } from "../store";


interface IExerciseState {
    currentExercise: IExercise | null;
    allExercises: IExercise[];
    loading: string;
    error: string;

}

const initialState: IExerciseState = {
    currentExercise: null,
    allExercises: [],
    loading: '',
    error: ''

}

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(exercisesApi.endpoints.getExercises.matchPending, (state) => {
                // Handle loading state if needed
                state.loading = 'pending';
            })
            .addMatcher(exercisesApi.endpoints.getExercises.matchFulfilled, (state, action) => {
                // Update state with data when the query is fulfilled
                state.allExercises = [action.payload];
                state.loading = 'fulfilled';
                state.error = '';
            })
            .addMatcher(exercisesApi.endpoints.getExercises.matchRejected, (state, action) => {
                // Handle error state when the query is rejected
                state.loading = 'rejected';
                state.error = 'An error occurred while fetching exercises.';
            })
            // .addMatcher((action) => action.type === 'exercise/setCurrentExercise', (state, action) => {
            //     // Handle setting the current exercise
            //     state.currentExercise = action.payload;
            //   });
            .addMatcher(exercisesApi.endpoints.getOneExercises.matchFulfilled, (state, action) => {
                state.currentExercise = action.payload;
            })
    },
})

export default exerciseSlice.reducer;
export const selectOneExercise = (state: RootState) => state.exercise.currentExercise;
export const selectAllExercises = (state: RootState) => state.exercise.allExercises;