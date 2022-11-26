/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import usePembayaran from "../../../store/crud/pembayaran";
import "./style.css";

const ListMenu = () => {
  const [links, setLinks] = useState();
  const keranjang_id = localStorage.getItem("keranjang_id");
  const { getPembayaran } = usePembayaran();

  useEffect(() => {
    const menu = [];
    const cekMenu = async () => {
      // tambah menu
      menu.push(
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
        }
      );
      setLinks(menu);
      const { data } = await getPembayaran(keranjang_id);
      if (data.data && data.data.status !== "selesai") {
        menu.push({
          name: "Pembayaran",
          submenu: false,
          link: "/user/checkout",
        });
        setLinks(menu);
      }
    };
    cekMenu();
  }, [keranjang_id]);

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
