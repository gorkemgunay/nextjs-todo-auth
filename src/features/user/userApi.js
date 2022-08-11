import { apiSlice } from "../../apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    refreshToken: builder.query({
      query: () => "/auth/refresh-token",
    }),
    me: builder.query({
      query: () => "/auth/me",
    }),
    logout: builder.mutation({
      query: () => "/auth/logout",
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
