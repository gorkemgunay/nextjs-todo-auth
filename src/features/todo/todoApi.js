import { apiSlice } from "../../apiSlice";

const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todo",
    }),
    createTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "POST",
        body: payload,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;

export default todoApi;
