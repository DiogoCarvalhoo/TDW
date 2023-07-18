import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilteredPlayer } from "../../pages/team/[id]";
import { RootState } from "../store";

interface IPlayers {
  filteredPlayers: Array<IFilteredPlayer>;
  paginatorPage: number;
}

const initialState: IPlayers = {
  filteredPlayers: [],
  paginatorPage: 1,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    changePlayersPaginatorPage: (state, action: PayloadAction<number>) => {
      state.paginatorPage = action.payload;
    },
    changeFilteredPlayers: (
      state,
      action: PayloadAction<Array<IFilteredPlayer>>
    ) => {
      state.filteredPlayers = action.payload;
    },
  },
});

export const filteredPlayers = (state: RootState) =>
  state.players.filteredPlayers;
export const playersPaginatorPage = (state: RootState) =>
  state.players.paginatorPage;

export const { changeFilteredPlayers, changePlayersPaginatorPage } =
  playersSlice.actions;

export default playersSlice.reducer;
