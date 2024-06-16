import React from "react";
import ReactDOM from "react-dom";
//import { Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./Login.css";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Me from "./Me";

import PrivateRoute from "./PrivateRoute";
import Auth from "./Auth";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/me"
        element={
          <PrivateRoute>
            <Me />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
