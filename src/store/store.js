import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = (preloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(),
    devTools: process.env.NODE_ENV !== "production",
  });

setupListeners(store.dispatch);
