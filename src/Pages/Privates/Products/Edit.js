import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { useFirebase } from "../../../Components/FirebaseProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import Loading from "../../../Components/Loading";
import { useSnackbar } from "notistack";
import useStyles from "./style";
import { Prompt } from 'react-router-dom'

const Edit = ({ match }) => {
  const classes = useStyles();
  const { firestore, user, storage } = useFirebase();
  const producArvis = firestore.doc(
    `arvis/${user.uid}/product/${match.params.productId}`
  );
  console.log(producArvis, '<<<producArvis')
  const [snapshot, loading] = useDocument(producArvis);
  const [isSubmit, setSubmit] = useState(false);
  const [isChange, setChange] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    nama: "",
    price: 0,
    stock: 0,
    description: "",
  });
  const productStorage = storage.ref(`arvis/${user.uid}/product/${match.params.productId}`)
  console.log(productStorage, '<<product')
  const [error, setError] = useState({
    nama: "",
    price: "",
    stock: "",
    description: "",
  });

  const validate = () => {
    let newError = { ...error };
    if (!form.nama) {
      newError.nama = "Product name is required";
    }
    if (!form.price) {
      newError.price = "Product price is required";
    } else if (form.price <= 0) {
      newError.price = "Product price cannot less than 0";
    }
    if (!form.stock) {
      newError.stock = "Product stock is required";
    } else if (form.stock <= 0) {
      newError.stock = "Product stock cannot less than 0";
    }

    if (!form.description) {
      newError.description = "Product description is required";
    }
    return newError;
  };

  useEffect(() => {
    if (snapshot) {
      setForm((currentForm) => ({
        ...currentForm,
        ...snapshot.data(),
      }));
    }
  }, [snapshot]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
    setChange(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    const findErros = Object.values(errors).some((err) => err !== "");
    if (findErros) setError(errors);
    else {
      setSubmit(true);
      try {
        await producArvis.set(form, { merge: true });
        enqueueSnackbar(`Data success be saved`, {
          variant: "success",
        });
        setChange(false)
      } catch (e) {
        enqueueSnackbar(`${e.message}`, {
          variant: "error",
        });
      }
      setSubmit(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  // handle upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!['image/jpg', 'image/png', 'image/jpeg', 'image/gif'].includes(file.type)){
      setError((error) => ({
        ...error,
        photo: `Unsupported file type : ${file.type}`,
      }));
    } else if (file.size >= 512000) {
      setError((error) => ({
        ...error,
        photo: `File size cannot bigger than 512KB`,
      }));
    } else { 
        const reader = new FileReader();
        reader.onabort = () => { 
            setError(error => ({ 
                ...error, 
                photo: `Reading aborted!` 
            }))
        }

        reader.onerror = () => { 
            setError(error => ({ 
                ...error,
                photo: `Reading error!`
            }))
        }

        reader.onload = async () => { 
            setSubmit(true)
            try { 
                const photoExtention = file.name.substring(file.name.lastIndexOf('.'))
                const photoRef = productStorage.child(`${match.params.productId}${photoExtention}`)
                const photoSnapsot = await photoRef.putString(reader.result, 'data_url')
                const photoUrl = await photoSnapsot.ref.getDownloadURL()
                setForm(currentForm => ({ 
                    ...currentForm, 
                    photo: photoUrl
                }))
                setChange(true)
            } catch(e) { 
                console.log(e.message)
                setError(error => ({ 
                    ...error,
                    photo: e.message
                }))
            }
            setSubmit(false)
        }
        reader.readAsDataURL(file)
    }
  };

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={6} md={3}>
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
          <div>
              { 
                form.photo &&
              <img 
                src={form.photo}
                alt={`product-${form.nama}`}
                className={classes.previewProduct}
              />
              }
            <input
              type="file"
              id="upload-image-product"
              accept="image/jpg, image/png, image/jpeg, image/gif"
              className={classes.inputImage}
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-image-product">
              <Button variant="outlined" component="span" disabled={isSubmit || !isChange}>
                Upload Product Image
              </Button>
            </label>
            <div className={classes.errorNotifUpload}>
              {error.photo && (
                <Typography variant="error">
                  {error.photo}
                </Typography>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <Button
            form="edit-form"
            type="submit"
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Prompt 
        when={isChange}
        message = 'Are you sure want to left this page?'
      />
    </div>
  );
};
export default Edit;
