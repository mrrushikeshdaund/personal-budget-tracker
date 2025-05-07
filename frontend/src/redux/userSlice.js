import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUserData: {},
  open: false,
  selectedMonth: 1,
  alertOpen: false,
  severity: "success",
  alertMessage: "",
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
    setAlertOpen: (state, action) => {
      state.alertOpen = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
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
  setAlertOpen,
  setSeverity,
  setAlertMessage,
} = userSlice.actions;
