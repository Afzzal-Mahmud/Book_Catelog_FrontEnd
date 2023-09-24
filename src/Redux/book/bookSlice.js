import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../enums/bookApiStatus";

/* the bookSlice getAll books by using Thunk(Custom) which store all the data and filter the data based on Genre, it used on Books.jsx file */

const initialState = {
  books: [],
  selectedGenre: [],
  searchedBasedBooks:[],
  status: STATUSES.IDLE,
};

export const bookSlice = createSlice({
  name: "fetchBooks",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSelectedGenre: (state, action) => {

      if(state.searchedBasedBooks.length){
        state.searchedBasedBooks = []
      }
      /* The action is actually the genre of books */
      if (action.payload) {
        state.selectedGenre = state.books.filter(
          (book) => book?.genre === action?.payload
        );
      } else {
        /* when action is null it returns the state.books as selectedGenre*/ 
        state.selectedGenre = state.books;
      }
    },
    setBooksBasedOnSearch : (state,action) => {
      // setting the genre state to empty
      if(state.selectedGenre.length){
        state.selectedGenre = []
      }

      if(action.payload){
        state.searchedBasedBooks = state.books.filter(
          (book) => book.title?.toLowerCase().includes(action.payload)
        )
      } else{
        state.searchedBasedBooks = state.books
      }
    }
  },
});
export const { setBooks, setStatus, setSelectedGenre,setBooksBasedOnSearch} = bookSlice.actions;
export default bookSlice.reducer;

// Thunks
export function fetchBooks() {
  return async function fetchBooksThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch("https://book-catalouge.vercel.app/api/v1/books");
      const data = await res.json();
      dispatch(setBooks(data.data));
      dispatch(setStatus(STATUSES.IDLE))
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
