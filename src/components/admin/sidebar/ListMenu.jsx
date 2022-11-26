/** @format */

import React, { useEffect, useState } from "react";
import {
  AiFillAppstore,
  AiFillHdd,
  AiOutlineRight,
  AiOutlineDown,
} from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.css";

const ListMenu = () => {
  const [links, setLinks] = useState();
  const [heading, setHeading] = useState("");

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const name = pathname.split("/");
    setHeading(name[2]);
  }, [pathname]);

  useEffect(() => {
    setLinks([
      {
        name: "dashboard",
        submenu: false,
        link: "/admin/dashboard",
      },
      {
        name: "gambar",
        submenu: false,
        link: "/admin/gambar",
      },
      {
        name: "lokasi",
        submenu: true,
        sublink: [
          { name: "distrik", link: "/admin/lokasi/distrik" },
          { name: "kelurahan", link: "/admin/lokasi/kelurahan" },
          { name: "ongkir", link: "/admin/lokasi/ongkir" },
        ],
      },
      {
        name: "barang",
        submenu: false,
        link: "/admin/barang",
      },
      {
        name: "pembayaran",
        submenu: false,
        link: "/admin/pembayaran",
      },
    ]);
  }, []);

  const setIcon = (name) => {
    if (name === "dashboard") {
      return <AiFillAppstore />;
    }
    if (name === "gambar") {
      return <AiFillHdd />;
    }
    if (name === "lokasi") {
      return <AiFillHdd />;
    }
    if (name === "barang") {
      return <AiFillHdd />;
    }
    if (name === "pembayaran") {
      return <AiFillHdd />;
    }
  };

  return (
    <nav className="font-coustard-regular admin">
      {links &&
        links.map((link, index) => (
          <div key={index}>
            {!link.submenu ? (
              <NavLink
                className="flex items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-secondary hover:text-gray-50"
                to={link.link}
              >
                {setIcon(link.name)}
                <span className="mx-4 font-medium capitalize">{link.name}</span>
              </NavLink>
            ) : (
              // jika sub menu di clik
              <div
                onClick={() => {
                  heading !== link.name
                    ? setHeading(link.name)
                    : setHeading("");
                }}
              >
                <Link className="flex justify-between items-center px-4 py-2 mt-2 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-secondary hover:text-gray-50">
                  <div className="flex items-center">
                    {setIcon(link.name)}
                    <span className="mx-4 font-medium capitalize">
                      {link.name}
                    </span>
                  </div>
                  <div className="text-gray-700">
                    {heading === link.name ? (
                      <AiOutlineDown />
                    ) : (
                      <AiOutlineRight />
                    )}
                  </div>
                </Link>
                <div
                  className={`${
                    heading === link.name ? "block" : "hidden"
                  } ml-10`}
                >
                  {link.submenu &&
                    link.sublink.map((sub, isub) => (
                      <div key={isub}>
                        <NavLink
                          className="flex items-center px-2 py-2 text-gray-600 transition-colors duration-300 transform rounded-md hover:bg-secondary hover:text-gray-50"
                          to={sub.link}
                        >
                          <span className="mx-4 font-medium capitalize">
                            {sub.name}
                          </span>
                        </NavLink>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </nav>
  );
};

export default ListMenu;
