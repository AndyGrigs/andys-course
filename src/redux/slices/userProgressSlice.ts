import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModuleProgress, ExerciseProgress } from "../../types";
import { RootState } from "../store";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useGetUserModuleProgressQuery, useGetUserExerciseProgressQuery } from '../services/progressApi';



interface FetchModuleProgressPayload {
  userId: string;
  moduleId: string;
}
interface FetchExerciseProgressPayload {
  userId: string;
  moduleId: string;
}

export const fetchModuleProgress = createAsyncThunk('progress/module/fetch', async (payload: FetchModuleProgressPayload, thunkAPI) => {
  try {
    const { userId, moduleId } = payload;
    const { data } = await useGetUserModuleProgressQuery({ userId, moduleId });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});



export const fetchExerciseProgress = createAsyncThunk('progress/exersise/fetch', async (payload: FetchExerciseProgressPayload, thunkAPI) => {
  try {
    const { userId, moduleId } = payload;
    const { data } = await useGetUserExerciseProgressQuery({ userId, moduleId });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

interface ProgressState {
  moduleProgress: ModuleProgress;
  exerciseProgress: ExerciseProgress;
  completed: boolean;
}

const initialState: ProgressState = {
  moduleProgress: {
    moduleId: '',
    progress: 0,
    completed: false
  },
  exerciseProgress: {
    exerciseId: '',
    exerciseAnswers: new Map<string, string>(),
    progress: 0,
    completed: false
  },
  completed: false,
};

export const userProgressSlice = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    setModuleProgress: (state, action: PayloadAction<ModuleProgress>) => {
      state.moduleProgress = action.payload;
    },
    setExerciseProgress: (state, action: PayloadAction<ExerciseProgress>) => {
      state.exerciseProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModuleProgress.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.moduleProgress = action.payload;
      }
    });
    builder.addCase(fetchExerciseProgress.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.exerciseProgress = action.payload;
      }
    });

  }
});

export const { setModuleProgress, setExerciseProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) =>
  state.userProgress.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) =>
  state.userProgress.exerciseProgress;
