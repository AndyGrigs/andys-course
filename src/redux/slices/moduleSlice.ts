import { Module } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { moduleApi } from "../services/modules";
import { RootState } from "../store";

interface ModuleState {
    currentModule: Module | null;
    courseModules: Module[];
}

const initialState: ModuleState = {
    currentModule: null,
    courseModules: [],
};

const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setCurrentModule: (state, action) => {
            state.currentModule = action.payload;
        },
        clearCurrentModule: (state) => {
            state.currentModule = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(moduleApi.endpoints.getOneModule.matchFulfilled, (state, action) => {
                state.currentModule = action.payload;
            })
            .addMatcher(moduleApi.endpoints.getAllModules.matchFulfilled, (state, action) => {
                state.courseModules = action.payload;
            })
    },
})

export const { setCurrentModule, clearCurrentModule } = moduleSlice.actions;
export default moduleSlice.reducer;
export const selectCurrentModule = (state: RootState) => state.module.currentModule;
export const selectCourseModules = (state: RootState) => state.module.courseModules