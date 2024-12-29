import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/posts" }),
  endpoints: (builder) => ({
    createPostAPI: builder.mutation({
      query: ({token , postData}) => ({
        url: "/create",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: postData,
      }),
    }),
    updatePostAPI: builder.mutation({
      query: ({token , postData}) => ({
        url: `/${postData?._id}`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          title : postData?.title ,
          description : postData?.description
        },
      }),
    }),
    deletePostAPI: builder.mutation({
      query: ({token , postId}) => ({
        url: `/${postId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getAllPostAPI: builder.query({
      query: ({ token , page }) => {
        return {
          url: `/?page=${page}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        };
      },
    }),
    getPostAPI: builder.query({
      query: ({ token , postId }) => {
        return {
          url: `/${postId}`,
          headers: { Authorization: `Bearer ${token}` },
          method: "GET",
        };
      },
    }),
  }),
});



const { 
  useCreatePostAPIMutation ,
  useUpdatePostAPIMutation ,
  useGetAllPostAPIQuery ,
  useGetPostAPIQuery ,
  useDeletePostAPIMutation
} = postsApi;


    
export {
  useCreatePostAPIMutation ,
  useUpdatePostAPIMutation ,
  useGetAllPostAPIQuery ,
  useGetPostAPIQuery ,
  useDeletePostAPIMutation ,
  postsApi,
};
