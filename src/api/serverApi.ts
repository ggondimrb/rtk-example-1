import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PostType = {
  id: number;
  title: string;
  author: string;
  checked: boolean;
}

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<PostType[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
      transformResponse: (response: PostType[]) => {
        response.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        })
        return response;
      }
    }),
    addPost: builder.mutation<PostType, PostType>({
      query: (body) => (
        {
          url: 'posts',
          method: 'POST',
          body
        }
      ),
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation<PostType, PostType>({
      query: (body) => (
        {
          url: `posts/${body.id}`,
          method: 'PUT',
          body
        }
      ),
      invalidatesTags: ['Posts']
    }),
    removePost: builder.mutation<void, number>({
      query: (id) => (
        {
          url: `posts/${id}`,
          method: 'DELETE',
        }
      ),
      invalidatesTags: ['Posts']
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useUpdatePostMutation, useRemovePostMutation } = serverApi