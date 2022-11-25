/** @format */

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../../../components/admin/topbar/TopBar";
import { Input, Option, Select } from "@material-tailwind/react";
import Table from "../../../components/table/Table";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import Form from "./Form";
import setPesan from "../../../services/toast";
import Paginate from "../../../components/paginate/Paginate";
import useKelurahan from "../../../store/crud/kelurahan";

const Kelurahan = () => {
  const { setKelurahan, dtKelurahan, responses, removeData } = useKelurahan();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [dataEdit, setDataEdit] = useState({});
  const [cekEdit, setCekEdit] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setKelurahan(search, page, limit);
  }, [setKelurahan, search, page, limit]);

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

  const headers = ["No", "Nama Distrik", "Nama Kelurahan", "Aksi"];
  const tableBodies = [`distrik.nama`, `nama`];

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
        <TopBar judul="Halaman Kelurahan" />
      </div>
      {/* container */}
      <div className="mt-3 font-SawarabiMincho mr-4">
        {/* header */}
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-coustard-black text-my-gray">
              Data Kelurahan
            </h2>
            <p className="text-my-gray">
              Silahkan menambah, mengubah dan menghapus data Kelurahan
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
        {/* tabel n paginate data */}
        <div className="flex flex-col gap-3">
          {/* tabel */}
          <div>
            <Table
              headers={headers}
              dataTable={dtKelurahan}
              tableBodies={tableBodies}
              setEdit={handleEdit}
              setDelete={handleDelete}
              page={page}
              limit={limit}
            />
          </div>
          {/* paginate */}
          <div className="my-3 flex justify-center">
            <Paginate pageData={responses} setPage={setPage} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Kelurahan;
