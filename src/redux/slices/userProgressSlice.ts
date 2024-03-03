import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserExerciseProgress, UserModuleProgress } from "../../types";
import { progressApi } from "../services/progressApi";

interface UserProgressState {
    moduleProgress: Record<string, UserModuleProgress>;
    exerciseProgress: Record<string, UserExerciseProgress>;
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
                // Your reducer logic here
                // Assuming the action payload contains moduleProgress and exerciseProgress
                // state.moduleProgress = action.payload.moduleProgress;
                state.moduleProgress = action.payload.moduleProgress as unknown as Record<string, UserModuleProgress>;
            }
        );
        builder.addMatcher(
            progressApi.endpoints.getUserExerciseProgress.matchFulfilled,
            (state, action) => {
                // Your reducer logic here
                // Assuming the action payload contains moduleProgress and exerciseProgress
                // state.moduleProgress = action.payload.exerciseProgress;
                state.exerciseProgress = action.payload.exerciseProgress as unknown as Record<string, UserExerciseProgress>;
            }
        );
    }
});

export const { setModuleProgress, setExersiseProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectUserModuleProgress = (state: RootState) => state.userProgerss.moduleProgress;
export const selectUserExerciseProgress = (state: RootState) => state.userProgerss.exerciseProgress;