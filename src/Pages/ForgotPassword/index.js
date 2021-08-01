import React, { useState } from "react";
import {
  Button,
  Paper,
  Container,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import useStyles from "../ForgotPassword/style";
import { Link, Redirect } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { useFirebase } from "../../Components/FirebaseProvider";
import Loading from "../../Components/Loading/index";
import { useSnackbar } from "notistack";

const ForgotPassword = (props) => {
  const { location } = props;
  const style = useStyles();
  const { auth, user, loading } = useFirebase();
  const [form, setForm] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const [isSubmit, setSubmit] = useState(false);

  const validate = () => {
    const newError = { ...error };

    if (!form.email) newError.email = "Email is required";
    else if (!isEmail(form.email)) newError.email = "Email is invalid";
    return newError;
  };

  // use snack bar

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
        setSubmit(true);
        const actionSettings = {
          url: `${window.location.origin}/login`,
        };
        await auth.sendPasswordResetEmail(form.email, actionSettings);
        enqueueSnackbar(`Password reset email has been sent to ${form.email}`, {
          variant: "success",
        });
        setSubmit(false);
      } catch (e) {
        console.log(e);
        const newError = {};
        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "Email not found";
            break;
          case "auth/invalid-email":
            newError.email = "Email user is invalid";
            break;
          default:
            newError.email = "An error occured please, try again";
            break;
        }
        setError(newError);
        setSubmit(false);
      }
    }
  };
  if (loading) return <Loading />;
  if (user) {
    const redirectTo =
      location.state && location.state.form && location.state.form.pathName
        ? location.state.form.pathName
        : "/";
    return <Redirect to={redirectTo} />;
  }
  return (
    <Container maxWidth="xs">
      <Paper className={style.paper}>
        <Typography variant="h5" component="h1" className={style.title}>
          Forgot Password
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
          <Grid item xs className={style.button}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
             Send
            </Button>
          </Grid>
          <div className={style.goToSignUp}>
            <Typography
              component={Link}
              to="/login"
              className={style.goToSignUp}
            >
              Remember your password?
            </Typography>
          </div>
        </form>
      </Paper>
    </Container>
  );
};
export default ForgotPassword;
