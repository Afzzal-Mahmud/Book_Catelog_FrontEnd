import { createSlice } from "@reduxjs/toolkit";
import { WARNING_STATUSES } from "../enums/warningStatus";

const initialState = {
  favouriteBooks: [],
  warning: WARNING_STATUSES.WARNING_FALSE,
};

export const favouriteBooksSlice = createSlice({
  name: "favouriteBooks",
  initialState,
  reducers: {
    setFavouriteBooks: (state, action) => {
      if (!state.favouriteBooks.includes(action.payload)) {
        state.favouriteBooks.push(action.payload);
      }
    },

    setWarning: (state, action) => {
      /* setWarning setting the state to WARNING_TRUE state from component under action*/
      state.warning = action.payload;
    },
    clearWarning: (state) => {
      state.warning = WARNING_STATUSES.WARNING_FALSE;
    },
  },
});
export const { setFavouriteBooks, setWarning, clearWarning } =
  favouriteBooksSlice.actions;
export default favouriteBooksSlice.reducer;
