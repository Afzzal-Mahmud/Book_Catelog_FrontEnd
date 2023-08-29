import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const bookDetailsApi = createApi({
    reducerPath : 'bookDetails',
    baseQuery : fetchBaseQuery({baseUrl : 'https://book-catalouge.vercel.app/api/v1/'}),
    endpoints : (builder) => ({
        getBookDetails : builder.query({
            query : (_id) => `/books/${_id}`
        })
    })
})

export const { useGetBookDetailsQuery } = bookDetailsApi