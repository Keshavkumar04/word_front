import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Me = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          setUserData(data.user);
        } else {
          setError(data.errorMessage);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Use navigate to redirect to the login page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      {userData && (
        <div className="mb-6">
          <p className="text-lg">
            <span className="font-semibold">Username:</span> {userData.username}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          {/* Add other user fields as needed */}
        </div>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Me;
