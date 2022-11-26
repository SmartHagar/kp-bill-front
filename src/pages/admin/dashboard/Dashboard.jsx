/** @format */

import React from "react";
import TopBar from "../../../components/admin/topbar/TopBar";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      {/* title */}
      <div className="border-b py-2">
        <TopBar judul="Halaman Dashboard" />
      </div>
      {/* container */}
      <div className="mt-5 font-Arvo-BoldItalic text-lg">Selamat Datang...</div>
    </motion.div>
  );
};

export default Dashboard;
