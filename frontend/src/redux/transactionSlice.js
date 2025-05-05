import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionData: [],
};

const transactionSlice = createSlice({
  name: "transaction",
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
export default transactionSlice.reducer;

// Named export for actions
export const { setIsAuthenticated, setCurrentUserData, setOpen } =
  transactionSlice.actions;
