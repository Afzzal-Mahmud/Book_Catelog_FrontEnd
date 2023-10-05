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
    setBookmarkedBook: (state, action) => {
      const updatedBookBookmark = state.favouriteBooks.map((book) =>
        book._id === action.payload ? { ...book, bookmark: !book.bookmark } : book
      );
      state.favouriteBooks = updatedBookBookmark
    },
    deleteFavouriteBook: (state, action) => {
      state.favouriteBooks = state.favouriteBooks.filter(book => book._id !== action.payload)
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
export const { setFavouriteBooks, setBookmarkedBook, deleteFavouriteBook, setWarning, clearWarning } =
  favouriteBooksSlice.actions;
export default favouriteBooksSlice.reducer;
