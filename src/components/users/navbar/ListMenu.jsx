/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const ListMenu = () => {
  const [links, setLinks] = useState();

  useEffect(() => {
    setLinks([
      {
        name: "dashboard",
        submenu: false,
        link: "/user/dashboard",
      },
      {
        name: "barang",
        submenu: false,
        link: "/user/barang",
      },
      {
        name: "galeri",
        submenu: false,
        link: "/user/galeri",
      },
      {
        name: "tentang kami",
        submenu: false,
        link: "/user/tentang-kami",
      },
    ]);
  }, []);

  return (
    <nav className="user md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center text-black font-Arvo-Regular gap-6">
      {links &&
        links.map((row, index) => (
          <div key={index}>
            <NavLink to={row.link} className="capitalize">
              {row.name}
            </NavLink>
          </div>
        ))}
    </nav>
  );
};

export default ListMenu;
