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

export const pollMasterInfoOptionsSlice = createSlice({
  name: "pollMasterInfoOptions",
  initialState,
  reducers: {
    updatePollMasterInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.description = action.payload.description;
      state.profile_image_url = action.payload.profile_image_url;
      state.public_metrics = action.payload.public_metrics;
    },
  },
});

export const pollMasterId = (state: RootState) =>
  state.pollMasterInfoOptions.id;
export const pollMasterName = (state: RootState) =>
  state.pollMasterInfoOptions.name;
export const pollMasterUsername = (state: RootState) =>
  state.pollMasterInfoOptions.username;
export const pollMasterDescription = (state: RootState) =>
  state.pollMasterInfoOptions.description;
export const pollMasterProfileImageUrl = (state: RootState) =>
  state.pollMasterInfoOptions.profile_image_url;
export const pollMasterPublicMetrics = (state: RootState) =>
  state.pollMasterInfoOptions.public_metrics;

export const { updatePollMasterInfo } = pollMasterInfoOptionsSlice.actions;

export default pollMasterInfoOptionsSlice.reducer;
