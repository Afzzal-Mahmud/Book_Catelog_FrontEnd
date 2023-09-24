import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const bookDetailsApi = createApi({
    reducerPath : 'bookDetails',
    baseQuery : fetchBaseQuery({baseUrl : 'https://book-catalouge.vercel.app/api/v1/'}),
    // tagTypes: ['review'],
    endpoints : (builder) => ({
        getBookDetails : builder.query({
            query : (_id) => `/books/${_id}`,
            // providesTags: ['comments'],
        }),

        postBookReview : builder.mutation({
            query: ({id,data}) => ({
                url: `/books/${id}`,
                method: 'POST',
                body: data
              }),
            //   invalidatesTags: ['review'],
        })
    })
})

export const { useGetBookDetailsQuery, usePostBookReviewMutation } = bookDetailsApi