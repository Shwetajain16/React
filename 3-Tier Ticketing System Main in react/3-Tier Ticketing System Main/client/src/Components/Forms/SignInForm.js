import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../actions/auth";
import { GoogleLogin } from "react-google-login";
import { AUTH } from "../../constants/actionTypes";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Grid } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
const initialValue = {
  email: "",

  password: "",
};



const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
  },
});
const SignInForm = () => {
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate("/home");
    } catch (error) {}
  };
  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");
  const [user, setUser] = useState(initialValue);
  const { email, password } = user;

  
  

  const classes = useStyles();

 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Common onChangeSetState()
  const onChangeSetState = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Common onChangeValidation()

  function validateDetails() {
    dispatch(signin(user, navigate));
  }

  // Common onClick().

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Login</Typography>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          onChange={(e) => onChangeSetState(e)}
          required
          name="email"
          value={email}
          id="txtEmailId"
          inputProps={{ maxLength: 50 }}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          onChange={(e) => onChangeSetState(e)}
          required
          name="password"
          value={password}
          id="txtPassword"
          inputProps={{ maxLength: 12 }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={email.length === 0 || password.length === 0}
          onClick={() => validateDetails()}
        >
          Login Here
        </Button>
      </FormControl>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <GoogleLogin
        clientId="117130353886-ln0jb4f9j04berph5c0c61ambk2qd1n7.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            className={classes.googleButton}
            style={{ backgroundColor: "lightgrey" }}
            fullWidth
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="contained"
          >
            Google Sign In
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleError}
        cookiePolicy="single_host_origin"
      />
      <Grid container justify="flex-end">
        <Grid item>
          <Button component={Link} to="/signup">
            "Don't have an account? Sign Up"
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default SignInForm;
