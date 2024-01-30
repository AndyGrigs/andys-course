import { createSlice } from "@reduxjs/toolkit";
import { UserProgress } from "../../types";
import { RootState } from "../store";

interface UserProgressState {
    progress: Record<string, UserProgress>
}


export const userProgressSlice = createSlice({
    name: 'userProgress',
    initialState: { progress: {} } as UserProgressState,
    reducers: {
        setProgress: (state, action) => {
            const { moduleId, progress } = action.payload;
            state.progress[moduleId] = progress;
        },
    },
});

export const { setProgress } = userProgressSlice.actions;
export default userProgressSlice.reducer;
export const selectCurrentModule = (state: RootState) => state.module.currentModule;
export const selectCourseModules = (state: RootState) => state.module.courseModules;