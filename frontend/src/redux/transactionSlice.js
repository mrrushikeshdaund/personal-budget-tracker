import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionData: [],
  totalExpense: 0,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionData: (state, action) => {
      state.transactionData = action.payload;
    },
    setTotalExpense: (state, action) => {
      state.totalExpense = action.payload;
    },
  },
});

// Default export for the reducer
export default transactionSlice.reducer;

// Named export for actions
export const { setTransactionData, setTotalExpense } = transactionSlice.actions;
