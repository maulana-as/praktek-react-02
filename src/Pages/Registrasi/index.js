import React, { useState } from "react";
import {
  Button,
  Paper,
  Container,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import useStyles from "./style";
import { Link, Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { useFirebase } from "../../Components/FirebaseProvider";
import Loading from '../../Helpers/Loading'

const Registrasi = () => {
  const style = useStyles();
  const { auth, user, loading } = useFirebase();
  const [form, setForm] = useState({
    email: "",
    password: "",
    ulangi_password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    ulangi_password: "",
  });

  const [isSubmit, setSubmit] = useState(false);


  const validate = () => {
    const newError = { ...error };

    if (!form.email) newError.email = "Email is required";
    else if (!isEmail(form.email)) newError.email = "Email is invalid";

    if (!form.password) newError.password = "Password is required";
    if (!form.ulangi_password)
      newError.ulangi_password = "Confirm Password is required";
    else if (form.password !== form.ulangi_password)
      newError.ulangi_password = "Please make sure your password match";

    return newError;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    const findErros = Object.values(errors).some((err) => err !== "");
    if (findErros) setError(errors);
    else {
      try {
        setSubmit(true)
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      } catch (err) {
        console.log(err);
        const newError = {};
        switch (e.code) {
          case "auth/email-already-exists":
                newError.email = 'Email is already is used'
            break;
          case "auth/invalid-email": 
                newError.email = 'Email user is invalid'
            break;
          case "auth/weak-password": 
                newError.password = "Password too weak"
            break;
          case "auth/operation-not-allowed": 
                newError.email = "Unsupported email and password"
            break;
          default:
                newError.email = "An error occured please, try again"
            break;
        }
        setError(newError)
        setSubmit(false)
      }
    }
};
if(loading) return <Loading />
if (user) return  <Redirect to = '/' />


  return (
    <Container maxWidth="xs">
      <Paper className={style.paper}>
        <Typography variant="h5" component="h1" className={style.title}>
          Create your account
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="email"
            type="email"
            name="email"
            margin="normal"
            label="Email"
            helperText={error.email}
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            error={error.email ? true : false}
            disabled={isSubmit}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            margin="normal"
            label="Password"
            helperText={error.password}
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            error={error.password ? true : false}
            disabled={isSubmit}
          />
          <TextField
            id="ulangi_password"
            type="password"
            name="ulangi_password"
            margin="normal"
            label="Confirm Password"
            helperText={error.ulangi_password}
            value={form.ulangi_password}
            onChange={handleChange}
            fullWidth
            required
            error={error.ulangi_password ? true : false}
            disabled={isSubmit}
          />
          <Grid item xs className={style.button}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Create Account
            </Button>
          </Grid>
          <Grid>
            <Grid item className={style.goToLogin}>
              <Typography component={Link} to="/login">
                Already have an account? Sign In
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Registrasi;
