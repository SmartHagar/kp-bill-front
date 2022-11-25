/** @format */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../../../components/admin/topbar/TopBar";
import { Input, Option, Select } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import Form from "./Form";
import setPesan from "../../../services/toast";
import Paginate from "../../../components/paginate/Paginate";
import useBarang from "../../../store/crud/barang";
import showRupiah from "../../../services/rupiah";

const Barang = () => {
  const { setBarang, dtBarang, responses, removeData } = useBarang();
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [dataEdit, setDataEdit] = useState({});
  const [cekEdit, setCekEdit] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBarang(search, page, limit);
  }, [setBarang, search, page, limit]);

  const handleEdit = (item) => {
    setCekEdit(true);
    setDataEdit(item);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Yakin menghapus data ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { status } = await removeData(id);
        if (status !== "error") {
          Swal.fire("Deleted!", "Data berhasil dihapus.", "success");
        }
      }
    });
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Toaster />
      <Form
        open={open}
        setOpen={setOpen}
        dataEdit={dataEdit}
        cekEdit={cekEdit}
        setPesan={setPesan}
      />
      {/* title */}
      <div className="border-b py-2">
        <TopBar judul="Halaman Barang" />
      </div>
      {/* container */}
      <div className="mt-3 font-SawarabiMincho mr-4">
        {/* header */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-coustard-black text-my-gray">
              Data Barang
            </h2>
            <p className="text-my-gray">
              Silahkan menambah, mengubah dan menghapus data barang
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setOpen(true);
                setCekEdit(false);
              }}
              className="rounded border border-primary px-6 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring"
            >
              Tambah Data
            </button>
          </div>
        </div>
        {/* tools data */}
        <div className="flex justify-between flex-wrap mt-6 gap-3 md:gap-0">
          {/* cari data */}
          <div className="md:w-4/5 w-full">
            <Input
              label="Cari Data"
              color="pink"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* tampilkan data */}
          <div>
            <Select
              onChange={(e) => setLimit(e)}
              variant="outlined"
              color="pink"
              label="Tampilkan"
            >
              <Option value="5">5</Option>
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select>
          </div>
        </div>
        {/* card n paginate data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-3">
          {/* card */}
          {dtBarang &&
            dtBarang.map((row, index) => (
              <div key={index}>
                <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                  <img
                    alt="Home"
                    src={row.gambar}
                    className="h-56 w-full rounded-md object-cover"
                  />

                  <div className="mt-2">
                    <table>
                      <tbody>
                        <tr>
                          <td className="align-top">Nama</td>
                          <td className="align-top">:</td>
                          <td className="align-top">{row.nama}</td>
                        </tr>
                        <tr>
                          <td>Harga</td>
                          <td>:</td>
                          <td>{showRupiah(row.harga)}</td>
                        </tr>
                        <tr>
                          <td>Satuan</td>
                          <td>:</td>
                          <td>{row.satuan}</td>
                        </tr>
                        <tr>
                          <td>Stok</td>
                          <td>:</td>
                          <td>{row.stok}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-6 flex justify-around gap-8 text-xs">
                      <button
                        onClick={() => handleEdit(row)}
                        type="button"
                        className="py-2 px-3 text-xs font-medium text-center text-yellow-900 hover:text-white border border-yellow-400 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                      >
                        Ubah
                      </button>

                      <button
                        onClick={() => handleDelete(row.id)}
                        type="button"
                        className="py-2 px-3 text-xs font-medium text-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* paginate */}
        <div className="my-3 mt-5 flex justify-center">
          <Paginate pageData={responses} setPage={setPage} />
        </div>
      </div>
    </motion.div>
  );
};

export default Barang;
