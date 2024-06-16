import React from "react";
import swal from "sweetalert";
import { Button, TextField, Link, InputAdornment } from "@material-ui/core";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { withRouter } from "./utils";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      showPassword: false, // Add showPassword state for password visibility toggle
    };
  }

  handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/facebook`;
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  register = () => {
    const { username, email, password } = this.state;

    // Simple email validation
    if (!this.isValidEmail(email)) {
      swal({
        title: "Error",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return;
    }

    // Password length validation
    if (password.length < 6) {
      swal({
        title: "Error",
        text: "Password must be at least 6 characters long.",
        icon: "error",
      });
      return;
    }

    // If validations pass, proceed with registration
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        swal({
          title: "Success",
          text: res.data.title, // Assuming your API returns a title for success
          icon: "success",
        }).then(() => {
          this.props.navigate("/");
        });
      })
      .catch((err) => {
        let errorMessage = "Registration failed.";
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          errorMessage = err.response.data.errorMessage;
        }
        swal({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  isValidEmail = (email) => {
    // Very basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  render() {
    const { username, email, password, showPassword } = this.state;
    const isFormValid = username !== "" && email !== "" && password !== "";

    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-600 to-purple-600">
        <div className="p-12 bg-white shadow-md rounded-md max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Register</h2>
          </div>

          <div className="mb-4">
            <div className="text-left mb-2">Username</div>
            <TextField
              id="username"
              type="text"
              autoComplete="off"
              name="username"
              value={username}
              onChange={this.onChange}
              placeholder="Enter your username"
              required
              className="w-full mb-4"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <div className="text-left mb-2 mt-4">Email</div>
            <TextField
              id="email"
              type="email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={this.onChange}
              placeholder="Enter your email"
              required
              className="w-full mb-4"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <div className="text-left mb-2 mt-4">Password</div>
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              name="password"
              value={password}
              onChange={this.onChange}
              placeholder="Enter your password"
              required
              className="w-full mb-4"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={this.togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
            />
            <div className="mb-10 text-sm text-gray-500 font-bold"></div>
            <Button
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              variant="contained"
              color="primary"
              size="small"
              disabled={!isFormValid}
              onClick={this.register}
            >
              Register
            </Button>
          </div>
          <div className="text-center mb-4">
            <Link
              component="button"
              className="text-blue-500 hover:underline"
              onClick={() => {
                this.props.navigate("/");
              }}
            >
              Login
            </Link>
          </div>
          <div className="text-center">
            <h2 className="text-xl mb-4">Or Register using</h2>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={this.handleGoogleLogin}
                className="py-2 bg-white rounded-md hover:bg-gray-200"
              >
                <img
                  src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
                  alt="Google Login"
                  className="h-6"
                />
              </Button>
              <Button
                onClick={this.handleFacebookLogin}
                className="py-2 bg-white rounded-md hover:bg-gray-200"
              >
                <img src="pngegg (1).png" alt="GitHub Login" className="h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);