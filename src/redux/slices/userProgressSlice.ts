import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ModuleProgress, ExerciseProgress } from "../../types";
import { progressApi } from "../services/progressApi";

interface UserProgressState {
    moduleProgress: Record<string, ModuleProgress>;
    exerciseProgress: Record<string, ExerciseProgress>;
}


export const userProgressSlice = createSlice({
    name: 'userProgress',
    initialState: { moduleProgress: {}, exerciseProgress: {} } as UserProgressState,
    reducers: {
        setModuleProgress: (state, action) => {
            const { moduleId, progress } = action.payload;
            state.moduleProgress[moduleId] = progress;
        },
        setExersiseProgress: (state, action) => {
            const { exerciseId, progress } = action.payload;
            state.exerciseProgress[exerciseId] = progress;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            progressApi.endpoints.getUserModuleProgress.matchFulfilled,
            (state, action) => {
                const moduleProgress = action.payload;
                state.moduleProgress[moduleProgress.moduleId] = moduleProgress;
            }
        );
        builder.addMatcher(
            progressApi.endpoints.getUserExerciseProgress.matchFulfilled,
            (state, action) => {
                const exerciseProgress = action.payload;
                state.exerciseProgress[exerciseProgress.exerciseId] = exerciseProgress;
            }
        );
    }
});

export const { setModuleProgress, setExersiseProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) => state.userProgerss.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) => state.userProgerss.exerciseProgress;