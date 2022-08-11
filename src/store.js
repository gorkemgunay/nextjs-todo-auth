import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
