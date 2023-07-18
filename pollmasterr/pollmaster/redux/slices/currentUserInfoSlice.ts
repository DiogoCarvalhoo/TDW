import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoType } from "../../pages/polls";
import { RootState } from "../store";

const initialState: UserInfoType = {
  id: "",
  name: "",
  username: "",
  description: "",
  profile_image_url: "",
  public_metrics: {},
};

export const currentUserInfoOptionsSlice = createSlice({
  name: "currentUserInfoOptions",
  initialState,
  reducers: {
    updateCurrentUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.description = action.payload.description;
      state.profile_image_url = action.payload.profile_image_url;
      state.public_metrics = action.payload.public_metrics;
    },
    cleanCurrentUserInfo: (state) => {
      state.id = "";
      state.name = "";
      state.username = "";
      state.description = "";
      state.profile_image_url = "";
      state.public_metrics = {};
    },
  },
});

export const currentUserId = (state: RootState) =>
  state.currentUserInfoOptions.id;
export const currentUserName = (state: RootState) =>
  state.currentUserInfoOptions.name;
export const currentUserUsername = (state: RootState) =>
  state.currentUserInfoOptions.username;
export const currentUserDescription = (state: RootState) =>
  state.currentUserInfoOptions.description;
export const currentUserProfileImageUrl = (state: RootState) =>
  state.currentUserInfoOptions.profile_image_url;
export const currentUserPublicMetrics = (state: RootState) =>
  state.currentUserInfoOptions.public_metrics;

export const { updateCurrentUserInfo, cleanCurrentUserInfo } =
  currentUserInfoOptionsSlice.actions;

export default currentUserInfoOptionsSlice.reducer;
