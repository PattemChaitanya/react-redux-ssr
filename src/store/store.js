import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
