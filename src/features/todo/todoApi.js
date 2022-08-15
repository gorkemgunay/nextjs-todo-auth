import { apiSlice } from "../../apiSlice";

const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todo",
      providesTags: ["User", "Todo", "Category"],
    }),
    getTodosByCategory: builder.query({
      query: (categoryId) => ({ url: `/todo/${categoryId}` }),
      providesTags: ["User", "Todo", "Category"],
    }),
    createTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User", "Todo", "Category"],
    }),
    updateTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User", "Todo", "Category"],
    }),
    deleteTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["User", "Todo", "Category"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodosByCategoryQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;

export default todoApi;
