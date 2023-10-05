import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import bookReducer from "./book/bookSlice"
import favouriteBooksReducer from "./book/favouriteBookSlice";
import { api } from "./api/apiSlice";
import userReducer from "./userAuth/userAuthSlice"
export const store = configureStore({
    reducer : {
        books : bookReducer,
        favouriteBooks : favouriteBooksReducer,
        user : userReducer,
        [api.reducerPath] : api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)