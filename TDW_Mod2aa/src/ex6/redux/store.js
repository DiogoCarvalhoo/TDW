import { configureStore } from "@reduxjs/toolkit";
import { catsAPI } from "./reducers/catsReducer";

export const store = configureStore({
  reducer: { [catsAPI.reducerPath]: catsAPI.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsAPI.middleware),
});
