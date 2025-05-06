import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUserData: {},
  open: false,
  selectedMonth: 1,
};

const userSlice = createSlice({
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
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

// Default export for the reducer
export default userSlice.reducer;

// Named export for actions
export const {
  setIsAuthenticated,
  setCurrentUserData,
  setOpen,
  setSelectedMonth,
} = userSlice.actions;
