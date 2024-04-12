import { IUser } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";
import { RootState } from "../store";
import { progressApi } from '../services/progressApi';

interface UpdateExerciseProgressPayload {
  exerciseId: string;
  progress: number;
}


interface InitialState {
  user: (IUser & { token: string }) | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    updateLokalUserExerciseProgress: (state, action: PayloadAction<UpdateExerciseProgressPayload>) => {
      if (state.user) {
        state.user.exerciseProgress.find(progress => {
          if (progress.exerciseId === action.payload.exerciseId
          ) {
            progress.progress = action.payload.progress;
          }
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(progressApi.endpoints.updateUserExerciseProgress.matchFulfilled, (state, action) => {
        if (state.user) {
          const updatedProgress = action.payload;

          state.user.exerciseProgress = state.user.exerciseProgress.map(progress => {
            if (progress.exerciseId === updatedProgress.exerciseId) {
              return updatedProgress;
            }
            return progress;
          });
        }

      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, updateLokalUserExerciseProgress } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectUser = (state: RootState) => state.auth.user;
