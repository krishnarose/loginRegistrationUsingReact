import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useUserData from './useUserData';

// Initialize react-toastify

const Nav = () => {
  const userData = useUserData();

  useEffect(() => {
    const logoutFlag = localStorage.getItem("logoutFlag");
    if (logoutFlag) {
      toast.success('Logout successfully');
      localStorage.removeItem("logoutFlag"); // Remove the flag after showing the message
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("resp");
    localStorage.setItem("logoutFlag", "true"); // Set the logout flag
    window.location.reload(); // Force reload to update Nav component
  };

  return (
    <div className="sticky top-0 flex justify-between items-center p-2 shadow-xl bg-white">
      <div>
        <h1 className="text-2xl font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">Demo WebPage</h1>
      </div>
      <div className="flex items-center space-x-10">
        {userData ? (
          <button
            onClick={logoutUser}
            className="md:text-2xl font-semibold md:bg-rose-500 rounded-xl py-2 px-4 md:hover:text-white md:hover:bg-rose-700 text-white bg-sky-500 hover:bg-sky-700"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="text-2xl font-semibold bg-green-500 rounded-xl py-2 px-4 hover:text-white hover:bg-green-700 ">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
