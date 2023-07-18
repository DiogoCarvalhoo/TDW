import { configureStore } from "@reduxjs/toolkit";
import { newsAPI } from "./reducers/newsReducer";
import { teamsAPI } from "./reducers/teamsReducer";
import { createWrapper } from "next-redux-wrapper";
import filteredTeamsOptionsReducer from "./reducers/filteredTeamsReducer";
import playersReducer from "./reducers/playersReducer";

export const store = configureStore({
  reducer: {
    filteredTeamsOptions: filteredTeamsOptionsReducer,
    players: playersReducer,
    [newsAPI.reducerPath]: newsAPI.reducer,
    [teamsAPI.reducerPath]: teamsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(newsAPI.middleware)
      .concat(teamsAPI.middleware),
});

const makeStore = () => store;

export type RootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
