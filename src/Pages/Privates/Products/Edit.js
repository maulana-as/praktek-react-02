import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useFirebase } from "../../../Components/FirebaseProvider";
import { useDocument } from 'react-firebase-hooks/firestore/dist/firestore'

const Edit = ({match}) => {
  const { firestore, user } = useFirebase()

  const producArvis = firestore.doc(`arvis/${user.id}/product/${match.params.productId}`)
  const [snapshot, loading] = useDocument()
  const [form, setForm] = useState({
    nama: "",
    sku: "",
    price: 0,
    stock: 0,
    description: ""
  });

  const [error, setError] = useState({
    nama: "",
    sku: "",
    price: 0,
    stock: 0,
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={6}  md={6} lg= {6} >
          <form>
            <TextField
              id="nama"
              label="Product Name"
              margin="normal"
              fullwidth
              value={form.nama}
              onChange={handleChange}
              helperText={error.nama}
              error={error.nama ? true : false}
            />
            <TextField
              id="sku"
              label="Product Sku"
              margin="normal"
              fullwidth
              value={form.sku}
              onChange={handleChange}
              helperText={error.sku}
              error={error.sku ? true : false}
            />
            <TextField
              id="price"
              label="Product Price"
              margin="normal"
              type="number"
              fullwidth
              value={form.price}
              onChange={handleChange}
              helperText={error.price}
              error={error.price ? true : false}
            />
            <TextField
              id="stock"
              label="Product Price"
              type="number"
              margin="normal"
              fullwidth
              value={form.stock}
              onChange={handleChange}
              helperText={error.stock}
              error={error.stock ? true : false}
            />
            <TextField
              id="description"
              label="Product Description"
              margin="normal"
              multiline
              rowsMax={3}
              fullwidth
              value={form.description}
              onChange={handleChange}
              helperText={error.description}
              error={error.description ? true : false}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <Typography>Upload Image</Typography>
        </Grid>
        <Grid item xs={12}>
            <Button color="primay" variant="contained">Save</Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default Edit;
