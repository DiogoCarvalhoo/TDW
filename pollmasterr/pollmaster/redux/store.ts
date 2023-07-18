import { configureStore } from "@reduxjs/toolkit";
import { userTweetsApi } from "./apis/master_polls_api";
// import { teamsAPI } from "./reducers/teamsReducer";
import { createWrapper } from "next-redux-wrapper";
import pollMasterInfoOptionsSlice from "./slices/pollMasterInfoSlice";
import currentUserInfoOptionsSlice from "./slices/currentUserInfoSlice";

export const store = configureStore({
  reducer: {
    pollMasterInfoOptions: pollMasterInfoOptionsSlice,
    currentUserInfoOptions: currentUserInfoOptionsSlice,
    // [userTweetsApi.reducerPath]: userTweetsApi.reducer,
    // [teamsAPI.reducerPath]: teamsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // .concat(userTweetsApi.middleware),
  //   .concat(teamsAPI.middleware),
});

const makeStore = () => store;

export type RootState = ReturnType<typeof store.getState>;

export const wrapper = createWrapper(makeStore);
