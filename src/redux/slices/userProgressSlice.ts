import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModuleProgress, ExerciseProgress } from "../../types";
import { RootState } from "../store";

interface ProgressState {
  moduleProgress: ModuleProgress[];
  exerciseProgress: ExerciseProgress[];
}

const initialState: ProgressState = {
  moduleProgress: [],
  exerciseProgress: [],
};

export const userProgressSlice = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    setModuleProgress: (state, action: PayloadAction<ModuleProgress[]>) => {
      state.moduleProgress = action.payload;
    },
    setExerciseProgress: (state, action: PayloadAction<ExerciseProgress[]>) => {
      state.exerciseProgress = action.payload;
    },
  },
});

export const { setModuleProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) =>
  state.userProgress.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) =>
  state.userProgress.exerciseProgress;
