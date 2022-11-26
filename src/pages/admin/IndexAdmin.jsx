/** @format */

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";

const IndexAdmin = () => {
  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    const user_login = JSON.parse(localStorage.getItem("user_login"));
    if (user_login) {
      const { role } = user_login;
      if (role !== "admin") {
        navigate("/user/dashboard");
      }
    } else {
      navigate("/user/dashboard");
    }
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="relative z-50">
          <Sidebar />
        </div>
        <div className="w-full h-screen flex flex-col justify-between px-4 lg:ml-64">
          <Outlet />
          <div>Footer</div>
        </div>
      </div>
    </div>
  );
};

export default IndexAdmin;
