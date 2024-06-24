import { IExercise } from "../../app/types";
import { createSlice  } from "@reduxjs/toolkit";
import { exercisesApi } from "../services/exersiceApi";
import { RootState } from "../store";

interface IExerciseState {
  currentExercise: IExercise | null;
  allExercises: IExercise[];
}

const initialState: IExerciseState = {
  currentExercise: null,
  allExercises: [],
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    setCurrentExercise: (state, action) => {
      state.currentExercise = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(
      exercisesApi.endpoints.getExercises.matchFulfilled,
      (state, action) => {
        state.allExercises = action.payload.exercisesObj;
        if (action.payload.exercisesObj.length > 0) {
          state.currentExercise = action.payload.exercisesObj[0];
        }
      })
   .addMatcher(
      exercisesApi.endpoints.getOneExercises.matchFulfilled,
      (state, action) => {
        state.currentExercise = action.payload;
      });
 
  },
 
});

export default exerciseSlice.reducer;

export const { setCurrentExercise } = exerciseSlice.actions;

export const selectCurrentExercise = (state: RootState) =>
  state.exercise.currentExercise;

export const selectExerciseById = (state: RootState, exerciseId: string) =>
  state.exercise.allExercises.find((exercise) => exercise._id === exerciseId);

export const selectAllExercises = (state: RootState) =>
  state.exercise.allExercises;
