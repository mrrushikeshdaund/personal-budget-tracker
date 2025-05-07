import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertMessage,
  setAlertOpen,
  setOpen,
  setSeverity,
} from "../redux/userSlice";
import { updateTransaction } from "../api";

const types = ["income", "expense"];

const PopUp = ({ data }) => {
  const { open } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const [form, setForm] = useState({
    _id: "",
    category: "",
    amount: "",
    type: "income",
    description: "",
  });

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAction = async () => {
    console.log(form);
    const updatedObj = {
      transactionId: form._id,
      amount: form.amount,
      category: form.category,
      type: form.type,
      date: Date.now(),
      description: form.description,
    };
    const updatedTX = await updateTransaction(updatedObj);
    console.log(updatedTX);
    if (updatedTX.status === 200) {
      dispatch(setOpen(false));
      dispatch(setAlertOpen(true));
      dispatch(setSeverity("success"));
      dispatch(setAlertMessage(updatedTX.data.message));
    } else {
      dispatch(setOpen(false));
      dispatch(setAlertOpen(true));
      dispatch(setSeverity("error"));
      dispatch(setAlertMessage(updatedTX.data.message));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Transaction ID :- {form._id}</DialogTitle>
      <DialogContent className="space-y-4 mt-2 ">
        <TextField
          fullWidth
          name="category"
          label="Category"
          value={form.category}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          select
          name="type"
          label="Type"
          value={form.type}
          onChange={handleChange}
        >
          {types.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          name="amount"
          label="Amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmitAction}
          color="primary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
