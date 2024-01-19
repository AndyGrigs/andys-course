import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import auth from "./slices/authSlice";
import { listenerMiddleware } from "../middleware/authMid";
import module from "./slices/moduleSlice";
import { moduleApi } from "./services/modules";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    //[moduleApi.reducerPath]: moduleApi.reducer,
    auth,
    module,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(moduleApi.middleware)
      .prepend(listenerMiddleware.middleware),
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
