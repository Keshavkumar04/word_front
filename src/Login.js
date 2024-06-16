import React, { Component } from "react";
import swal from "sweetalert";
import {
  Button,
  TextField,
  Link,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { withRouter } from "./utils";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  login = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        this.props.navigate("/dashboard");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  render() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-600 to-purple-600">
        <div className="p-12 bg-white shadow-md rounded-md max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Login</h2>
          </div>
          <div>
            <div className="mb-3 text-sm text-gray-500 font-bold">Email</div>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Type your email"
              required
              className="w-full mb-2"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <div className="mb-3 mt-4 text-sm text-gray-500 font-bold">
              Password
            </div>
            <TextField
              id="standard-basic"
              type={this.state.showPassword ? "text" : "password"}
              autoComplete="off"
              name="password"
              value={this.state.password}
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
                  <InputAdornment position="end">
                    <IconButton onClick={this.togglePasswordVisibility}>
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="mb-20 text-sm text-gray-500 font-bold"></div>
            <Button
              className="w-full py-2 mt-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              variant="contained"
              color="primary"
              size="small"
              disabled={this.state.email === "" || this.state.password === ""}
              onClick={this.login}
            >
              Login
            </Button>
            <div className="text-center mb-4">
              <Link
                component="button"
                className="text-blue-500 hover:underline"
                onClick={() => {
                  this.props.navigate("/register");
                }}
              >
                Register
              </Link>
            </div>
            <div className="text-center">
              <h2 className="text-xl mb-4">Or login using</h2>
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
                  <img
                    src="pngegg (1).png"
                    alt="GitHub Login"
                    className="h-6"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
