import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import userReducer from "./features/user/userSlice";
import loaderReducer from "./features/loader/loaderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
