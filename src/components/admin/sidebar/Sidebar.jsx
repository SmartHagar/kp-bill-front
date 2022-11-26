/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../store/login";

import ListMenu from "./ListMenu";

const Sidebar = () => {
  // navigate
  const navigate = useNavigate();
  // logout store
  const { setLogout } = useLogin();

  const handleLogout = async () => {
    const logout = await setLogout();
    if (logout.status === "berhasil") {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="hidden lg:flex mr-2 flex-col w-64 h-screen px-4 pb-9 pt-4 border-r shadow-lg fixed z-50 bg-white">
      <h2 className="text-2xl font-corben-bold border-b text-center font-semibold text-thirt ">
        Menu
      </h2>
      <div className="flex flex-col justify-between flex-1 mt-6 z-50">
        <ListMenu />

        <div className="flex items-center px-4 -mx-2">
          <h4
            onClick={handleLogout}
            className="mx-2 font-medium text-my-gray hover:underline cursor-pointer"
          >
            Logout
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
