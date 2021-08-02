import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useFirebase } from "../../../Components/FirebaseProvider";
import { useDocument } from 'react-firebase-hooks/firestore'
import Loading from '../../../Components/Loading'
import { useSnackbar } from "notistack";


const Edit = ({match}) => {
  const { firestore, user } = useFirebase()
  const producArvis = firestore.doc(`arvis/${user.uid}/product/${match.params.productId}`)
  const [snapshot, loading] = useDocument(producArvis)  
  const [isSubmit, setSubmit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    nama: "",
    price: 0,
    stock: 0,
    description: ""
  });

  console.log(form, '<<formNama')
  const [error, setError] = useState({
    nama: "",
    price: "",
    stock: "",
    description: ""
  });


  const validate = () => { 
      let newError = { ...error }
      if (!form.nama) { 
          newError.nama = 'Product name is required'
      } 
      if (!form.price) { 
          newError.price = 'Product price is required'
      } else if (form.price <= 0) { 
          newError.price = 'Product price cannot less than 0'
      }
      if (!form.stock) { 
          newError.stock = 'Product stock is required'
      } else if (form.stock <= 0) { 
          newError.stock = 'Product stock cannot less than 0'
      } 

      if (!form.description) { 
          newError.description = 'Product description is required'
      }
      return newError
  }

  useEffect(() => { 
      if (snapshot) { 
        setForm(currentForm => ({ 
            ...currentForm,
            ...snapshot.data()
        }))
        console.log(snapshot, '<<<snapshot')
      }
  }, [snapshot])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({ 
        ...error,
        [e.target.name]: ''
    })
  };

  const handleSubmit = async (e) => { 
      e.preventDefault();
      const errors = validate();
      const findErros = Object.values(errors).some((err) => err !== "");
      if (findErros) setError(errors);
      else { 
          setSubmit(true)
          try { 
            await producArvis.set(form, { merge: true })
            enqueueSnackbar(`Data success be saved on documen`, {
                variant: "success",
              });
          } catch(e) { 
            enqueueSnackbar(`${e.message}`, {
                variant: "error",
              });
            }
            setSubmit(false)
      }
  }

  if (loading) { 
    return <Loading />
  }

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={6}  md={6} lg= {6} >
          <form id="edit-form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="nama"
              name="nama"
              label="Product Name"
              margin="normal"
              fullwidth
              required
              value={form.nama}
              onChange={handleChange}
              helperText={error.nama}
              error={error.nama ? true : false}
              disabled={isSubmit}
            />
            <TextField
              id="price"
              name="price"
              label="Product Price"
              margin="normal"
              type="number"
              fullwidth
              required
              value={form.price}
              onChange={handleChange}
              helperText={error.price}
              error={error.price ? true : false}
              disabled={isSubmit}
            />
            <TextField
              id="stock"
              name="stock"
              label="Product Stock"
              type="number"
              margin="normal"
              fullwidth
              required
              value={form.stock}
              onChange={handleChange}
              helperText={error.stock}
              error={error.stock ? true : false}
              disabled={isSubmit}
            />
            <TextField
              id="description"
              name="description"
              label="Product Description"
              margin="normal"
              multiline
              rowsMax={3}
              fullwidth
              required
              value={form.description}
              onChange={handleChange}
              helperText={error.description}
              error={error.description ? true : false}
              disabled={isSubmit}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
            <Typography>Upload Image</Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: '10px'}}>
            <Button form="edit-form" type="submit" color="primary" variant="contained">Save</Button>
        </Grid>
      </Grid>
    </div>
  );
};
export default Edit;
