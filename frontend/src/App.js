import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Transactions from "./pages/Transactions";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserData, setIsAuthenticated } from "./redux/userSlice";
import CharSection from "./components/CharSection";
import TransactionOverview from "./pages/TransactionOverview";
import BudgetsManagements from "./pages/BudgetsManagements";

function App() {
  const isAuthenticated = useSelector((state) => state.user);
  const token = localStorage.getItem("isAuthenticated");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      // If token exists, set isAuthenticated to true
      dispatch(setIsAuthenticated(true));
    } else {
      // If token does not exist, set isAuthenticated to false
      dispatch(setIsAuthenticated(false));
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashborad/:userId"
          element={isAuthenticated && <Dashboard />}
        >
          <Route path="overview" element={<CharSection />} />
          <Route
            path="transactionOverview"
            element={isAuthenticated && <TransactionOverview />}
          />
          <Route
            path="transactionsManagements"
            element={isAuthenticated && <Transactions />}
          />
          <Route
            path="budgetsManagements"
            element={isAuthenticated && <BudgetsManagements />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
