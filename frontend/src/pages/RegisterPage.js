import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegisterUser } from "../api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterAction = async () => {
    const response = await getRegisterUser({ email, password });
    console.log(response);
    if (response.status === 200) {
      navigate("/");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card style={{ width: "40vw" }} className="shadow-lg">
        <CardContent>
          <p className="text-3xl font-serif font-bold text-center m-5">
            Register User
          </p>
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
                onClick={handleRegisterAction}
              >
                Register
              </Button>
            </FormControl>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-600">
                If you have Already an account?{" "}
                <a href="/" className="text-blue-500">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
