/** @format */

import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Barang from "../pages/admin/barang/Barang";
// pages admin
import DashboardAdmin from "../pages/admin/dashboard/Dashboard";
import Distrik from "../pages/admin/distrik/Distrik";
import Gambar from "../pages/admin/gambar/Gambar";
import IndexAdmin from "../pages/admin/IndexAdmin";
import Kelurahan from "../pages/admin/kelurahan/Kelurahan";
import Ongkir from "../pages/admin/ongkir/Ongkir";
// auth pages
import Auth from "../pages/auth/Auth";
import CekLogin from "../pages/auth/CekLogin";
import LoginPage from "../pages/auth/Login";
import Register from "../pages/auth/Register";
// user pages
import DashboardUser from "../pages/users/dashboard/Dashboard";
import IndexUser from "../pages/users/IndexUser";
import BarangUser from "../pages/users/barang/Barang";

import NotFound from "../pages/Errors/NotFound";
import Personal from "../pages/users/personal/Personal";
import Checkout from "../pages/users/checkout/Checkout";
import Tentang from "../pages/users/tentang/Tentang";
import Galeri from "../pages/users/galeri/Galeri";
import Pembayaran from "../pages/admin/pembayaran/Pembayaran";

const MyRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={pathname}>
        <Route path="/" element={<Navigate replace to="/user/dashboard" />} />
        {/* user pages */}
        <Route path="user" element={<IndexUser />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="barang" element={<BarangUser />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="tentang-kami" element={<Tentang />} />
          <Route path="personal" element={<Personal />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* auth pages */}
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="cek-login" element={<CekLogin />} />
        </Route>
        {/* admin pages */}
        <Route path="admin" element={<IndexAdmin />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="gambar" element={<Gambar />} />
          <Route path="lokasi">
            <Route path="distrik" element={<Distrik />} />
            <Route path="kelurahan" element={<Kelurahan />} />
            <Route path="ongkir" element={<Ongkir />} />
          </Route>
          <Route path="barang" element={<Barang />} />
          <Route path="pembayaran" element={<Pembayaran />} />
        </Route>

        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default MyRoutes;
