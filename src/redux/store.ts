import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import auth from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
