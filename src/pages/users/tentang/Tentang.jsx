/** @format */

import React from "react";
import bg3 from "../../../assets/images/bg-3.jpeg";
import { motion } from "framer-motion";

const Tentang = () => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className="w-3/4 m-auto  font-CrimsonText-Regular">
        <h1 className="text-center font-CrimsonText-BoldItalic text-3xl">
          Sejarah Singkat Keramba
        </h1>
        <span class="inline-flex items-baseline gap-4 pt-5">
          <img src={bg3} alt="" class="self-start w-72 rounded-lg" />
          <span className="text-lg text-justify indent-8">
            Kelompok budidaya ikan air tawar KJA Asei kecil merupakan meruapakan
            salah satu ide usaha yg di bentuk oleh PT. Papua Muda Inspiratif
            (PMI) dengam tujuan dapat menciptakan suatu wadah bagi anak-anak
            muda untuk dapat belajar bagaimana memanfaatkan peluang usaha yang
            ada disekitar mereka, serta mengurangi tingkat pengangguran yg ada.
            KJA Asei Kecil mulai didirikan pada tanggal 23 April 2022 yang
            berarti hingga sekarang KJA Asei kecil baru berjalan sekitar delapan
            bulan hingga desember 2022.Walaupun KJA asei kecil ini masih
            tergolong berumur muda, namun telah dapat memberikan kontribusi
            dalam mengurangi angka pengangguran dengan mempekerjakan beberapa
            pemuda putus sekolah dan juga mahasiswa yg bekerja paruh waktu(part
            time).
          </span>
        </span>
      </div>
    </motion.div>
  );
};

export default Tentang;
