import counterSlice from "./reducers/counterReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore(
  { reducer: counterSlice.reducer },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
