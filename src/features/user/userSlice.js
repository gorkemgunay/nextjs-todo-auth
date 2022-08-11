import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = userSlice.actions;
export default userSlice.reducer;
