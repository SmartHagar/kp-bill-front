/** @format */

import { Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Paginate from "../../../components/paginate/Paginate";
import showRupiah from "../../../services/rupiah";
import setToast from "../../../services/toast";
import toastError from "../../../services/toast-error";
import useBarang from "../../../store/crud/barang";
import useKeranjang from "../../../store/crud/keranjang";
import useKeranjangDet from "../../../store/crud/keranjang-det";
import usePembayaran from "../../../store/crud/pembayaran";

const Barang = () => {
  // store
  const { setBarang, dtBarang, responses } = useBarang();
  const { setKeranjang, addData } = useKeranjang();
  const { addDataDet } = useKeranjangDet();
  const { getPembayaran } = usePembayaran();
  // state
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // cek data diri
  const dt_pembeli = JSON.parse(localStorage.getItem("dt_pembeli"));
  const keranjang_id = localStorage.getItem("keranjang_id");
  const handleCart = async (barang_id) => {
    if (!dt_pembeli) {
      return toastError(
        "Data diri tidak ada. Silahkan menambahkan data diri anda"
      );
    }
    const pembayaran = await getPembayaran(keranjang_id);
    if (pembayaran.data.data && pembayaran.data.data.status !== "selesai") {
      return toastError("Ada pembayan yang belum selesai.");
    }
    const { id } = dt_pembeli;
    // cek data keranjang
    const { data } = await setKeranjang(id, "proses");
    // jika ada tambahkan data keranjang detail
    if (data.data.length > 0) {
      const keranjang_id = data.data[0].id;
      // tambah keranjang_id ke local storage
      localStorage.setItem("keranjang_id", keranjang_id);
      // tambah keranjang det
      const keranjang_det = await addDataDet(keranjang_id, barang_id);
      if (keranjang_det.status === "berhasil") {
        setToast(
          {
            pesan: "Berhasil ditambahkan ke keranjang",
          },
          "top-left"
        );
      } else {
        toastError("Gagal");
      }
    } else {
      const keranjang = await addData(id);
      const keranjang_id = keranjang.data.data.id;
      // tambah keranjang_id ke local storage
      localStorage.setItem("keranjang_id", keranjang_id);
      // tambah keranjang det
      const keranjang_det = await addDataDet(keranjang_id, barang_id);
      if (keranjang_det.status === "berhasil") {
        setToast(
          {
            pesan: "Berhasil ditambahkan ke keranjang",
          },
          "top-left"
        );
      } else {
        toastError("Gagal");
      }
    }
  };

  // useEffect
  useEffect(() => {
    setBarang(search, page, limit);
  }, [setBarang, search, page, limit]);

  const card = () =>
    dtBarang &&
    dtBarang.map((row, index) => (
      <div key={index} className="p-4 w-full shadow-md">
        <a className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={row.gambar}
          />
        </a>
        <div className="mt-4">
          <h2 className="text-black title-font text-lg font-Arvo-Regular">
            {row.nama}
          </h2>
          <div className="flex justify-between items-center">
            <p className="mt-1 text-merah font-CrimsonText-Italic">
              {showRupiah(row.harga)}
            </p>
            <p className=" font-Arvo-Regular text-xs">{row.satuan}</p>
          </div>
          <button
            className="w-full font-Arvo-Regular mt-2 text-biru border border-biru hover:bg-biborder-biru hover:text-white hover:bg-biru active:bg-biru capitalize text-xs px-6 py-2 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => handleCart(row.id)}
          >
            Tambahkan Keranjang
          </button>
        </div>
      </div>
    ));

  return (
    <section className="text-gray-600 body-font">
      <Toaster />
      <div className="container px-5 mx-auto">
        {/* tools data */}
        <div className="flex justify-between flex-wrap mt-6 gap-3 md:gap-0 mb-6">
          {/* cari data */}
          <div className="md:w-2/3 lg:w-3/4 w-full">
            <Input
              label="Cari Data"
              color="blue"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* tampilkan data */}
          <div>
            <Select
              onChange={(e) => setLimit(e)}
              variant="outlined"
              color="blue"
              label="Tampilkan"
            >
              <Option value="5">5</Option>
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {card()}
        </div>
      </div>
      {/* paginate */}
      <div className="my-3 mt-5 flex justify-center">
        <Paginate pageData={responses} setPage={setPage} />
      </div>
    </section>
  );
};

export default Barang;
