import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import AddTransaction from "./pages/AddTransaction";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "./redux/userSlice";
import CharSection from "./components/CharSection";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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
        <Route path="/dashborad" element={isAuthenticated && <Dashboard />}>
          <Route path="overview" element={<CharSection />} />
        </Route>
        <Route
          path="/addTransaction"
          element={isAuthenticated && <AddTransaction />}
        />
        <Route path="/budgets" element={isAuthenticated && <Budgets />} />
        <Route
          path="/transactions"
          element={isAuthenticated && <Transactions />}
        />
      </Routes>
    </Router>
  );
}

export default App;
