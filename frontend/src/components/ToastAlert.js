import React, { useEffect } from "react";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlertOpen } from "../redux/userSlice";

const ToastAlert = () => {
  const dispatch = useDispatch();
  const { alertOpen, severity, alertMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setAlertOpen(false));
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <Collapse in={alertOpen}>
      <Alert
        variant="filled"
        severity={severity}
        onClose={() => dispatch(setAlertOpen(false))}
      >
        <AlertTitle>{severity}</AlertTitle>
        {alertMessage}
      </Alert>
    </Collapse>
  );
};

export default ToastAlert;
