import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import budgetSlice from "./budgetSlice";
import transactionSlice from "./transactionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    budget: budgetSlice,
    transaction: transactionSlice,
  },
});
