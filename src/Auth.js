import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlparams", urlParams);
    const token = urlParams.get("token");
    console.log("token", token);

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login"); // Redirect to login if token is not found
    }
  }, [navigate]);

  return (
    <div>
      <p>Authenticating...</p>
    </div>
  );
};

export default Auth;
