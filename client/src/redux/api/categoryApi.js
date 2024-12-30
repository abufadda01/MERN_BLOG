import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/category" }),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({token , categoryData}) => ({
        url: "",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: categoryData,
      }),
    }),
    getAllCategories: builder.query({
      query: ({token , page}) => ({
        url: "",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    getSingleCategory: builder.query({
      query: ({token , categoryId}) => ({
        url: `/${categoryId}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    deleteCategory: builder.mutation({
        query: ({token , categoryId}) => ({
          url: `/${categoryId}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }),
    }),
    updateCategory: builder.mutation({
        query: ({token , categoryId}) => ({
          url: `/${categoryId}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }),
    }),
  }),
});



const { 
    useCreateCategoryMutation ,
    useDeleteCategoryMutation ,
    useUpdateCategoryMutation ,
    useGetAllCategoriesQuery ,
    useGetSingleCategoryQuery
} = categoryApi


    
export {
    useCreateCategoryMutation ,
    useDeleteCategoryMutation ,
    useUpdateCategoryMutation ,
    useGetAllCategoriesQuery ,
    useGetSingleCategoryQuery ,
  categoryApi,
}
