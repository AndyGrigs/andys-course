import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { updateUserModuleProgress } from './userProgressOperations';



interface ProgressState {
  moduleProgress: number;
  exerciseProgress: number;
  error: string | null;
}

const initialState: ProgressState = {
  moduleProgress: 0,
  exerciseProgress: 0,
  error: null
};

export const userProgressSlice = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    setModuleProgress: (state, action: PayloadAction<number>) => {
      state.moduleProgress = action.payload;
    },
    setExerciseProgress: (state, action: PayloadAction<number>) => {
      state.exerciseProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserModuleProgress.fulfilled, (state, action) => {
      state.moduleProgress = action.payload.moduleProgress;
      state.exerciseProgress = action.payload.exerciseProgress;
      state.error = null;
    });

    builder.addCase(updateUserModuleProgress.rejected, (state, action) => {

      state.error = action.error.message || 'An unknown error occurred';
    });

  }
});

export const { setModuleProgress, setExerciseProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) =>
  state.userProgress.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) =>
  state.userProgress.exerciseProgress;
