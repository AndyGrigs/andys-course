import { Module } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { moduleApi } from "../services/modules";
import { RootState } from "../store";

interface ModuleState {
    currentModule: Module | null;
    courseModules: [];
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
            .addMatcher(moduleApi.endpoints.getModules.matchFulfilled, (state, action) => {
                state.currentModule = action.payload;
            })
        // Add more matchers for other module-related API endpoints if necessary
    },
})

export const { setCurrentModule, clearCurrentModule } = moduleSlice.actions;
export default moduleSlice.reducer;
export const selectCurrentModule = (state: RootState) => state.module.currentModule;