const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
