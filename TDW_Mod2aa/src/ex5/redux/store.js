import catsSlice from "./reducers/catsReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ reducer: { cats: catsSlice } });
