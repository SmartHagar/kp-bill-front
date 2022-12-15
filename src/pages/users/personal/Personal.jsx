/** @format */

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SelectSearch from "../../../components/select/SelectSearch";
import setToast from "../../../services/toast";
import toastError from "../../../services/toast-error";
import useKelurahan from "../../../store/crud/kelurahan";
import usePembeli from "../../../store/crud/pembeli";

const Personal = () => {
  // navigate
  const navigate = useNavigate();
  // store
  const { addData, updateData } = usePembeli();
  const { dtKelurahan, setKelurahan } = useKelurahan();
  // state
  const [NIK, setNIK] = useState("");
  const [nama, setNama] = useState("");
  const [jenkel, setJenkel] = useState("Laki-laki");
  const [noHp, setNoHp] = useState("");
  const [kelurahan, setDtKelurahan] = useState("");
  const [rtRw, setRtRw] = useState("");
  const [alamat, setAlamat] = useState("");
  // pilih kelurahan
  const options = dtKelurahan.map(function (kelurahan) {
    return {
      value: kelurahan.id,
      label: `${kelurahan.nama}`,
    };
  });
  const user_login = JSON.parse(localStorage.getItem("user_login"));
  const dt_pembeli = JSON.parse(localStorage.getItem("dt_pembeli"));
  // use effect
  useEffect(() => {
    setKelurahan();
    // jika belum login
    if (!user_login) {
      navigate("/auth/login");
    }
    if (user_login) {
      const { role } = user_login;
      if (role === "admin") {
        navigate("/admin/dashboard");
      }
    }
    // cek data pembeli
    if (dt_pembeli) {
      setNIK(dt_pembeli.NIK);
      setNama(dt_pembeli.nama);
      setJenkel(dt_pembeli.jenkel);
      setNoHp(dt_pembeli.no_hp);
      setRtRw(dt_pembeli.rt_rw);
      setAlamat(dt_pembeli.alamat);
      setDtKelurahan({
        value: dt_pembeli.kelurahan.id,
        label: dt_pembeli.kelurahan.nama,
      });
    }
  }, [setKelurahan]);

  // simpan diklik
  const handleSimpan = async (e) => {
    e.preventDefault();
    const items = {
      user_id: user_login.user_id,
      NIK,
      nama,
      jenkel,
      no_hp: noHp,
      kelurahan_id: kelurahan.value,
      rt_rw: rtRw,
      alamat,
    };

    const areTruthy = Object.values(items).every((value) => value);
    if (!areTruthy) {
      toastError("Silahkan isi semua data");
    }
    let cek;
    // jika ada data pembeli
    if (dt_pembeli) {
      cek = await updateData(dt_pembeli.id, items);
    } else {
      cek = await addData(items);
    }
    setToast(cek.data);
    // simpan data ke local storage
    localStorage.setItem("dt_pembeli", JSON.stringify(cek.data.data));
  };

  // jika belum terdaftar
  const formDaftar = () => (
    <div>
      <Toaster />
      <h1 className="text-center font-Arvo-Bold text-2xl">Data Diri</h1>
      <form className="font-Arvo-Regular" onSubmit={handleSimpan}>
        <div className="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-3">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="NIK">
              NIK
            </label>
            <input
              onChange={(e) => setNIK(e.target.value)}
              id="NIK"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              required={true}
              value={NIK}
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="nama">
              Nama Lengkap
            </label>
            <input
              onChange={(e) => setNama(e.target.value)}
              id="nama"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={nama}
            />
          </div>
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="jenkel"
            >
              Jenis Kelamin
            </label>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center">
                <input
                  id="laki-laki"
                  type="radio"
                  name="jenkel"
                  value="Laki-laki"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="laki-laki"
                  aria-describedby="laki-laki"
                  onChange={(e) => setJenkel(e.target.value)}
                  checked={jenkel === "Laki-laki"}
                />
                <label
                  htmlFor="laki-laki"
                  className="text-sm font-medium text-gray-900 ml-2 block"
                >
                  Laki-laki
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="perempuan"
                  type="radio"
                  name="jenkel"
                  value="Perempuan"
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  aria-labelledby="perempuan"
                  aria-describedby="perempuan"
                  onChange={(e) => setJenkel(e.target.value)}
                  checked={jenkel === "Perempuan"}
                />
                <label
                  htmlFor="perempuan"
                  className="text-sm font-medium text-gray-900 ml-2 block"
                >
                  Perempuan
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="no_hp">
              No. HP
            </label>
            <input
              required={true}
              onChange={(e) => setNoHp(e.target.value)}
              id="no_hp"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              value={noHp}
            />
          </div>
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="kelurahan_id"
            >
              Pilih Kelurahan
            </label>
            <div className="mt-2">
              <SelectSearch
                value={kelurahan}
                onChange={setDtKelurahan}
                options={options}
                id="kelurahan"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="rt_rw">
              RT/RW
            </label>
            <input
              onChange={(e) => setRtRw(e.target.value)}
              id="rt_rw"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              required={true}
              value={rtRw}
            />
          </div>
          <div className="lg:col-span-3">
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor="alamat"
            >
              Alamat
            </label>
            <input
              onChange={(e) => setAlamat(e.target.value)}
              id="alamat"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              required={true}
              value={alamat}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-biru transition-colors duration-300 transform bg-white rounded-md hover:bg-biru hover:text-white  outline outline-1">
            {dt_pembeli ? "Ubah Data" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
  //  jika sudah terdaftar
  const dataDiri = () => {
    return <div>Data Diri</div>;
  };

  return (
    <div>
      {/* cek jika belum terdaftar */}
      {formDaftar()}
      {/* cek jika sudah terdaftar */}
      {/* {dataDiri()} */}
    </div>
  );
};

export default Personal;
