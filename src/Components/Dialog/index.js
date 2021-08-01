import React, { useState } from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const DialogAddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [error, setError] = useState({
    name: "",
    price: "",
    quantity: '',
});

  const handleSave = async (e) => {
    e.preventDefault();
    const newError = { ...error };
    try {
      if (!form.name) {
        newError.name = "Product name is required";
      } 
      if (!form.price) { 
          newError.price = "Product price is required"
      } else if (form.price < 0) { 
          newError.price = "Product price should greater than equal 0"
      }
      if (!form.quantity) { 
        newError.quantity = "Product quantity is required"
    } else if (form.quantity < 0) { 
        newError.quantity = "Quantity price should greater than equal 0"
    }
      const findErros = Object.values(newError).some((err) => err !== "");
      if (findErros) setError(newError);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  return (
    <Dialog open={true}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSave} noValidate>
          <TextField
            name="name"
            label="Product Name"
            value={form.name}
            onChange={handleChange}
            helperText={error.name}
            error={error.name ? true : false}
            fullWidth
          />
          <TextField
            name="price"
            type="number"
            label="Product Price"
            fullWidth
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={form.price}
            onChange={handleChange}
            helperText={error.price}
            error={error.price ? true : false}
          />
          <TextField
            name="quantity"
            type="number"
            label="Quantity Product"
            fullWidth
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={form.quantity}
            onChange={handleChange}
            helperText={error.quantity}
            error={error.quantity ? true : false}
          />
          <DialogActions>
            <Button variant="contained">Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
