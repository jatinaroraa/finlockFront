import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IconButton, InputAdornment, Link } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./login.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    marginTop: "80px",
  },
  form: {
    width: "100%",
    maxWidth: 500,
    margin: "auto",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(8),
    },
    marginTop: "10px",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    position: "relative",
    background: "#003FB9 0% 0% no-repeat padding-box",
    "&:hover": {
      background: "#4634A7",
    },
  },
  spinner: {
    position: "absolute",
    top: "20%",
    left: "50%",
    color: "white",
    // fontWeight: "20px",
    // transform: "translate(-50%, -50%)",
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: "8px",
    width: "100% !important",
  },
  forgetPassDiv: {
    display: "flex",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const history = useHistory();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setShowWarning(event.target.value.length < 8);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    if (password.length < 8) {
      setShowWarning(true);
      return;
    }
    setIsSubmitting(true);
    // setTimeout(async () => {
    let res = await callLogin({
      email,
      password,
    });

    // Call your login API or perform your login logic here
    setIsSubmitting(false);
    // }, 6000);
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  const [loader, setLoader] = useState([]);
  const submitForm = (index) => {
    setLoader((prev) => {
      const newLoadings = [...prev];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoader((prev) => {
        const newLoadings = [...prev];
        newLoadings[index] = false;
        return newLoadings;
      });
    });
  };
  const [showPassword, setShowPassword] = useState(false);

  // Toggle the state for the password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const callLogin = async (data) => {
    // let url = "http://localhost:5000/api/user";
    let url = "https://server-rho-plum.vercel.app/api/user";
    try {
      let response = await axios.post(`${url}/login`, data);
      console.log(response, "response");

      if (response.data.token) {
        setCookie("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        return history.push("/");
      }
      return response;
    } catch (error) {
      console.log(error, "request error");
      if (error.response.status && error.response.data) {
        return window.alert(`${error.response.data.error}`);
      }
    }
  };
  return (
    <div className={classes.root}>
      <div className="upperContent">
        <div className="avtar">
          <div className="avtarIcon"></div>
        </div>
        <div className="textAvtar">
          <h1>welcome</h1>
          <p>
            Let's connect to your workspace. Please enter your email to
            continue.
          </p>
        </div>
      </div>
      <form
        style={{
          marginTop: "10px",
        }}
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              //   type="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.textField}
              value={password}
              onChange={handlePasswordChange}
              error={showWarning}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                showWarning ? "Password must be at least 8 characters long" : ""
              }
            />
            {/* <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
          </Grid>
          {/* <Grid item xs={12}>
            <Button
              type="primary"
              className={classes.submitButton}
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <CircularProgress size={24} className={classes.spinner} />
              )}
              Login
            </Button>
          </Grid> */}

          <Link
            // to="/"
            style={{
              textDecoration: "none",
            }}
            className="forgotPassword"
          >
            Forgot Password?
          </Link>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              loading={isSubmitting}
              className={`${classes.submitButton},submitBut`}
              //   onClick={() => submitForm(0)}
              //   disabled={isSubmitting}
              style={{ minHeight: "40px" }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} className={classes.spinner} />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default LoginPage;
