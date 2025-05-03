import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginUser } from "../api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useDispatch } from "react-redux";
import { setCurrentUserData, setIsAuthenticated } from "../redux/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginAction = async () => {
    const response = await getLoginUser({ email, password });
    dispatch(setCurrentUserData(response.data.data));
    const promise = new Promise((resolve, reject) => {
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", response.data.token);
        dispatch(setIsAuthenticated(true));
        resolve();
      } else {
        reject();
      }
    });
    promise.then(() => {
      navigate(`dashborad/${response.data.data._id}/overview`);
    });
    promise.catch(() => {
      alert("invalid login details");
    });
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card style={{ width: "40vw" }} className="shadow-lg">
        <CardContent>
          <p className="text-3xl font-serif font-bold text-center m-5">Login</p>
          <div className="">
            <FormControl
              variant="outlined"
              fullWidth
              className="flex flex-col gap-4"
            >
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handleLoginAction}
              >
                Login
              </Button>
            </FormControl>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500">
                  Register
                </a>
              </p>
              <p className="text-sm text-gray-600">
                Forgot Password?{" "}
                <a href="/forgot-password" className="text-blue-500">
                  Reset
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
