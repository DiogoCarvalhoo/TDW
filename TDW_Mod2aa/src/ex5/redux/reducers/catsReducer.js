import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { catsService } from "../../Services/CatsService";

export const fetchCats = createAsyncThunk(
  "cats/fetchCats",
  async (page = 0) => {
    const response = await catsService.getAllCats(page);
    return response;
  }
);

const catsSlice = createSlice({
  name: "cats",
  initialState: {
    cats_list: {},
    current_page: 0,
    isLoading: true,
    gotError: false,
  },
  reducers: {
    changePage(state, action) {
      state.current_page = action.payload;
      if (state.cats_list[state.current_page] === undefined) {
        state.isLoading = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.pending, (state) => {
      state.isLoading = true;
      state.gotError = false;
    });
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      state.cats_list[state.current_page] = action.payload;
      state.isLoading = false;
      state.gotError = false;
    });
    builder.addCase(fetchCats.rejected, (state) => {
      state.isLoading = false;
      state.gotError = true;
    });
  },
});

export const { changePage } = catsSlice.actions;

export default catsSlice.reducer;
