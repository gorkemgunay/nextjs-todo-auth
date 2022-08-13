import { apiSlice } from "../../apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category",
      providesTags: ["User", "Todo", "Category"],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "/category",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User", "Todo", "Category"],
    }),
    deleteCategory: builder.mutation({
      query: (payload) => ({
        url: "/category",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["User", "Todo", "Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
