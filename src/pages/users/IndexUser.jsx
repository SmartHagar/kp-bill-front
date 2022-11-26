/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/users/navbar/Navbar";

const IndexUser = () => {
  return (
    <div className="flex flex-wrap min-h-screen content-between">
      <div className="w-full">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
      <div className="w-full">
        <div className="border border-gray-300">
          <p className="p-2">Keramba 2022</p>
        </div>
      </div>
    </div>
  );
};

export default IndexUser;
