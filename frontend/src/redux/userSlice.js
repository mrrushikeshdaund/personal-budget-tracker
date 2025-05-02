import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

// Default export for the reducer
export default userSlice.reducer;

// Named export for actions
export const { setIsAuthenticated } = userSlice.actions;
