import { apiSlice } from "../../apiSlice";

const todoApiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ["Todo"] });

const todoApi = todoApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todo",
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (payload) => ({
        url: "/todo",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;

export default todoApi;
