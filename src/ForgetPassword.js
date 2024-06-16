import React from "react";
import swal from "sweetalert";
import { Button, TextField } from "@material-ui/core";
import { withRouter } from "./utils";
import axios from "axios";

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  ForgetPassword = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
        email: this.state.email,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.props.navigate("/");
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  render() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-600 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Forget Password</h2>
          </div>
          <div className="space-y-4">
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
              required
              className="w-full"
            />
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              size="small"
              disabled={this.state.email === ""}
              onClick={this.ForgetPassword}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ForgetPassword);
