import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUserData: {},
  open: false,
};

const budgetSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setCurrentUserData: (state, action) => {
      state.currentUserData = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

// Default export for the reducer
export default budgetSlice.reducer;

// Named export for actions
export const { setIsAuthenticated, setCurrentUserData, setOpen } =
  budgetSlice.actions;
