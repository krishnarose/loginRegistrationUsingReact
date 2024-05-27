import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import useUserData from "./useUserData";

// Initialize react-hot-toast (if required)
// toast.configure(); // Uncomment if needed

const Nav = () => {
  const userData = useUserData();

  useEffect(() => {
    const logoutFlag = localStorage.getItem("logoutFlag");
    if (logoutFlag) {
      toast.success("Logout successful");
      localStorage.removeItem("logoutFlag"); // Remove the flag after showing the message
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("resp");
    localStorage.setItem("logoutFlag", "true"); // Set the logout flag
    window.location.reload(); // Force reload to update Nav component
  };

  return (
    <>
      

      <div className="navbar bg-base-100 sticky top-0 flex justify-between items-center p-2 shadow-xl bg-white">
        <div className="flex-1">
          <Link to={"/"}>
            <h1 className="btn btn-ghost text-xl">Demo WebPage</h1>
          </Link>
        </div>
        <div className="flex-none gap-2">
          {userData ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <h1 className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </h1>
                  </li>
                  <li>
                    <h>Settings</h>
                  </li>
                  <li>
                    <button onClick={logoutUser}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
