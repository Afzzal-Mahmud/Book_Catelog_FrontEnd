import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import bookReducer from "./book/bookSlice"
import { bookDetailsApi } from "./book/bookDetailsSlice";
export const store = configureStore({
    reducer : {
        books : bookReducer,
        [bookDetailsApi.reducerPath] : bookDetailsApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookDetailsApi.middleware),
})

setupListeners(store.dispatch)