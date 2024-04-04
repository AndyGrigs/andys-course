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
  error: null,
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
      // Assuming the response contains the updated progress
      // You might need to adjust this based on the actual structure of your response
      state.moduleProgress = action.payload.moduleProgress;
      state.exerciseProgress = action.payload.exerciseProgress;
      state.error = null; // Clear any previous error
    });

    builder.addCase(updateUserModuleProgress.rejected, (state, action) => {
      // Handle the error case
      // action.error contains the error message passed by rejectWithValue
      state.error = action.error.message || 'An unknown error occurred';
    });
    //   builder.addCase(fetchModuleProgress.fulfilled, (state, action) => {
    //     if (action.payload !== undefined) {
    //       state.moduleProgress = action.payload;
    //     }
    //   });
    //   builder.addCase(fetchExerciseProgress.fulfilled, (state, action) => {
    //     if (action.payload !== undefined) {
    //       state.exerciseProgress = action.payload;
    //     }
    //   });

  }
});

export const { setModuleProgress, setExerciseProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) =>
  state.userProgress.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) =>
  state.userProgress.exerciseProgress;
