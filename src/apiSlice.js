import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAccessToken, setAccessToken } from "./features/user/userSlice";
import { toggleLoading } from "./features/loader/loaderSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  api.dispatch(toggleLoading(true));
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const tokens = await baseQuery("/auth/refresh-token", api, extraOptions);
    if (tokens?.data) {
      api.dispatch(setAccessToken({ accessToken: tokens.data.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearAccessToken());
    }
  }
  api.dispatch(toggleLoading(false));
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "UserLogout", "Todo", "Category"],
  endpoints: () => ({}),
});
