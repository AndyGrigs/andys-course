import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createAsyncThunk } from '@reduxjs/toolkit';



interface FetchModuleProgressPayload {
  userId: string;
  moduleId: string;
}
interface FetchExerciseProgressPayload {
  userId: string;
  moduleId: string;
}

// export const fetchModuleProgress = createAsyncThunk('progress/module/fetch', async (payload: FetchModuleProgressPayload, thunkAPI) => {
//   try {
//     const { userId, moduleId } = payload;
//     const data = await fetchUserModuleProgress(userId, moduleId);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       return thunkAPI.rejectWithValue(error.message);
//     } else {
//       return thunkAPI.rejectWithValue('An unknown error occurred');
//     }
//   }
// });



// export const fetchExerciseProgress = createAsyncThunk('progress/exersise/fetch', async (payload: FetchExerciseProgressPayload, thunkAPI) => {
//   try {
//     const { userId, moduleId } = payload;
//     const data = await fetchUserExerciseProgress(userId, moduleId);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       return thunkAPI.rejectWithValue(error.message);
//     } else {
//       return thunkAPI.rejectWithValue('An unknown error occurred');
//     }
//   }
// });

interface ProgressState {
  moduleProgress: number;
  exerciseProgress: number;
}

const initialState: ProgressState = {
  moduleProgress: 0,
  exerciseProgress: 0
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
  // extraReducers: (builder) => {
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

  // }
});

export const { setModuleProgress, setExerciseProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) =>
  state.userProgress.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) =>
  state.userProgress.exerciseProgress;
