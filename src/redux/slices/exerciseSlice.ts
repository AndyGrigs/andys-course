import { IExercise } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    setCurrrentExerciseId: (state, action: PayloadAction<string>) => {
      const exerciseToSet = state.allExercises.find((exercise) => {
        exercise._id === action.payload;
        if (exerciseToSet) {
          state.currentExercise = exerciseToSet;
        } else {
          console.error("Exercise not found");
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      exercisesApi.endpoints.getExercises.matchFulfilled,
      (state, action) => {
        state.allExercises = action.payload.exercisesObj;
      }
    );
  },
});

export default exerciseSlice.reducer;
export const selectOneExercise = (state: RootState) =>
  state.exercise.currentExercise;

export const selectExerciseById = (state: RootState, exerciseId: string) =>
  state.exercise.allExercises.find((exercise) => exercise._id === exerciseId);

// export const selectExercisesByModuleId = (state: RootState, moduleId: string) => state.exercise.allExercises.filter((exercise)=> exercise._id === )

export const selectAllExercises = (state: RootState) =>
  state.exercise.allExercises;
