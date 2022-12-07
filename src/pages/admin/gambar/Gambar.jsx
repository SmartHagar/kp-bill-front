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
import useGambar from "../../../store/crud/gambar";

const Gambar = () => {
  const { setGambar, dtGambar, responses, removeData } = useGambar();
  // pesan

  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [dataEdit, setDataEdit] = useState({});
  const [cekEdit, setCekEdit] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setGambar(search, page, limit);
  }, [setGambar, search, page, limit]);

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
        <TopBar judul="Halaman Gambar" />
      </div>
      {/* container */}
      <div className="mt-3 font-SawarabiMincho mr-4">
        {/* header */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-coustard-black text-my-gray">
              Data gambar
            </h2>
            <p className="text-my-gray">
              Silahkan menambah, mengubah dan menghapus data gambar
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
          {dtGambar &&
            dtGambar.map((row, index) => (
              <div key={index}>
                <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                  <img
                    alt="Home"
                    src={row.path}
                    className="h-56 w-full rounded-md object-cover"
                  />

                  <div className="mt-2">
                    <dl>
                      <div>
                        <dd className="font-medium text-center">{row.jenis}</dd>
                      </div>
                    </dl>

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

export default Gambar;
