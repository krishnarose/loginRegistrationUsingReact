import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useUserData from "./useUserData";

const Home = () => {
  const userData = useUserData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        {userData ? (
          <>
            <h1 className="text-center text-2xl font-semibold text-red-500 mt-6">
              Welcome{" "}
              <span className="text-3xl font-extrabold text-green-500 animate-pulse">
                {userData}
              </span>
            </h1>
          </>
        ) : (
          <>
            <h1 className="text-center text-2xl text-green-500">
              Please login to access all properties
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
