import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="sticky top-0 flex justify-between items-center p-2 shadow-xl bg-white">
        <div>
          <h1 className="text-2xl font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">Demo WebPage</h1>
        </div>
        <div className="flex items-center space-x-10">
          <Link to={"/"}>
            <span className="text-2xl bg-blue-500 px-2 py-1 text-white hover:bg-blue-700 rounded-xl">Login</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
