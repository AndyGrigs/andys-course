import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { AuthState } from "./slices/auth";

export interface RootState {
  auth: AuthState; // Replace with the correct type for your auth state
}

// Configure the store
const store: EnhancedStore<RootState> = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
