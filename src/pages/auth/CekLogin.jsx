/** @format */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CekLogin = () => {
  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    const user_login = JSON.parse(localStorage.getItem("user_login"));
    if (user_login) {
      const { role } = user_login;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      navigate("/user/dashboard");
    }
  }, []);
  return <div>CekLogin</div>;
};

export default CekLogin;
