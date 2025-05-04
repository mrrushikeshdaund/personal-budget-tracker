import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
          element={token ? <Dashboard /> : <Navigate to={"/"} />}
        >
          <Route path="overview" element={<CharSection />} />
          <Route
            path="transactionOverview"
            element={token ? <TransactionOverview /> : <Navigate to={"/"} />}
          />
          <Route
            path="transactionsManagements"
            element={token ? <Transactions /> : <Navigate to={"/"} />}
          />
          <Route
            path="budgetsManagements"
            element={token ? <BudgetsManagements /> : <Navigate to={"/"} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
