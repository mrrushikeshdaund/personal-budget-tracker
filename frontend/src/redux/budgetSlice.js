import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgetsData: [],
  totalBudget: 0,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudgetsData: (state, action) => {
      state.budgetsData = action.payload;
    },
    setTotalBudget: (state, action) => {
      state.totalBudget = action.payload;
    },
  },
});

// Default export for the reducer
export default budgetSlice.reducer;

// Named export for actions
export const { setBudgetsData, setTotalBudget } = budgetSlice.actions;
