import { apiSlice } from "../../apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    refreshToken: builder.query({
      query: () => "/auth/refresh-token",
      providesTags: ["User"],
    }),
    me: builder.query({
      query: () => "/auth/me",
      providesTags: ["User", "UserLogout"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["UserLogout"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenQuery,
  useMeQuery,
  useLogoutMutation,
} = userApi;

export default userApi;
