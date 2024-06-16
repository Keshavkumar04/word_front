import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token") || localStorage.getItem("token");
    console.log("Extracted Token:", token); // Log the extracted token for debugging

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token stored in localStorage"); // Log the token storage
      // Optionally, navigate to a clean URL without the token
      navigate("/me", { replace: true });
    } else {
      console.error("No token found"); // Log an error if no token is found
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="no-printme p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="flex space-x-4">
        <a
          href="/me"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Me
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
