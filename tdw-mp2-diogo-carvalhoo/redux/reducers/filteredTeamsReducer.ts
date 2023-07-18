import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilteredTeam } from "../../pages/team/[id]";
import { RootState } from "../store";

interface IFilteredTeamsOptions {
  filteredTeams: Array<IFilteredTeam>;
  filteredConference: string;
  filteredName: string;
  allTeams: number;
  westTeams: number;
  eastTeams: number;
  paginatorPage: number;
}

const initialState: IFilteredTeamsOptions = {
  filteredTeams: [],
  filteredConference: "all",
  filteredName: "",
  allTeams: 0,
  westTeams: 0,
  eastTeams: 0,
  paginatorPage: 1,
};

export const filteredTeamsOptionsSlice = createSlice({
  name: "filteredTeamsOptions",
  initialState,
  reducers: {
    changeFilteredConference: (state, action: PayloadAction<string>) => {
      state.filteredConference = action.payload;
    },
    changeFilteredName: (state, action: PayloadAction<string>) => {
      state.filteredName = action.payload;
    },
    changeFilteredTeams: (
      state,
      action: PayloadAction<Array<IFilteredTeam>>
    ) => {
      state.filteredTeams = action.payload;
    },
    changeAllTeams: (state, action: PayloadAction<number>) => {
      state.allTeams = action.payload;
    },
    changeWestTeams: (state, action: PayloadAction<number>) => {
      state.westTeams = action.payload;
    },
    changeEastTeams: (state, action: PayloadAction<number>) => {
      state.eastTeams = action.payload;
    },
    changeTeamsPaginatorPage: (state, action: PayloadAction<number>) => {
      state.paginatorPage = action.payload;
    },
  },
});

export const filteredTeams = (state: RootState) =>
  state.filteredTeamsOptions.filteredTeams;
export const filteredConference = (state: RootState) =>
  state.filteredTeamsOptions.filteredConference;
export const filteredName = (state: RootState) =>
  state.filteredTeamsOptions.filteredName;
export const allTeams = (state: RootState) =>
  state.filteredTeamsOptions.allTeams;
export const westTeams = (state: RootState) =>
  state.filteredTeamsOptions.westTeams;
export const eastTeams = (state: RootState) =>
  state.filteredTeamsOptions.eastTeams;
export const teamsPaginatorPage = (state: RootState) =>
  state.filteredTeamsOptions.paginatorPage;

export const {
  changeFilteredConference,
  changeFilteredName,
  changeFilteredTeams,
  changeAllTeams,
  changeWestTeams,
  changeEastTeams,
  changeTeamsPaginatorPage,
} = filteredTeamsOptionsSlice.actions;

export default filteredTeamsOptionsSlice.reducer;
