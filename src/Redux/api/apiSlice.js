import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const api = createApi({
    reducerPath : 'user/book',
    baseQuery : fetchBaseQuery({baseUrl : 'http://localhost:5000/api/v1/'}),
    
    tagTypes: ['review'],
    endpoints : (builder) => ({
        registerUser : builder.mutation({
            query: (data) => ({
                url: `/auth/signup`,
                method: 'POST',
                body: data
            }),
        }),

        logInUser : builder.mutation({
            query: (data) => ({
                url: `/auth/login`,
                method: 'POST',
                body: data
            }),
        }),

        getBookDetails : builder.query({
            query : (_id) => `/books/${_id}`,
        }),
        
        getBookReview : builder.query({
            query : (_id) => `/books/${_id}`,
            providesTags: ['review'],
        }),
        
        postBook : builder.mutation({
            query: (data) => ({
                url: `/books`,
                method: 'POST',
                credentials: 'include',
                body: data
            }),
        }),

        updateBook : builder.mutation({
            query: ({id,data}) => ({
                url: `/books/${id}`,
                method: 'PATCH',
                credentials: 'include',
                body: data,
            }),
        }),

        deleteBook : builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),
        
        postBookReview : builder.mutation({
            query: ({id,data}) => ({
                url: `/books/${id}`,
                method: 'POST',
                credentials: 'include',
                body: data
              }),
              invalidatesTags: ['review'],
        }),
    })
})

export const { useRegisterUserMutation,useLogInUserMutation, useGetBookDetailsQuery, usePostBookReviewMutation,useGetBookReviewQuery,usePostBookMutation,useUpdateBookMutation,useDeleteBookMutation } = api