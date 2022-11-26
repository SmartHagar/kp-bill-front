/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import showRupiah from "../../../services/rupiah";
import useKeranjangDetAPI from "../../../store/api/keranjang-det-api";
import useKeranjang from "../../../store/crud/keranjang";
import useKeranjangDet from "../../../store/crud/keranjang-det";
import useOngkir from "../../../store/crud/ongkir";
import usePembayaran from "../../../store/crud/pembayaran";

const Cart = ({ dtKeranjangDet, dt_pembeli }) => {
  // store
  const { addDataDet, removeData } = useKeranjangDet();
  const { setKeranjangBarang } = useKeranjangDetAPI();
  const { showOngkir, dtOngkir } = useOngkir();
  const { addData } = usePembayaran();
  const { updateData } = useKeranjang();
  // state
  // const [total, setTotal] = useState(0);
  // navigation
  const navigate = useNavigate();
  // tambah keranjang
  const handelTambah = (row) => {
    // tambah data keranjang det
    const { keranjang_id, barang_id } = row;
    addDataDet(keranjang_id, barang_id);
  };
  // kurangi keranjang
  const handelKurang = async (row) => {
    const { keranjang_id, barang_id } = row;
    // ambil data terakhir berdasarkan kernjang_id dan barang_id
    const { data } = await setKeranjangBarang(keranjang_id, barang_id);
    // hapus data keranjang det
    removeData(data.id);
  };
  // cart details
  const cartDetail = () => {
    const keranjang = dtKeranjangDet.reduce(
      (function (hash) {
        return function (dtKeranjangDet, obj) {
          if (!hash[obj.barang_id])
            dtKeranjangDet.push(
              (hash[obj.barang_id] = {
                barang_id: obj.barang_id,
                keranjang_id: obj.keranjang_id,
                nama: obj.barang.nama,
                gambar: obj.barang.gambar,
                harga: obj.barang.harga,
                jumlah: 1,
              })
            );
          else hash[obj.barang_id].jumlah++;
          return dtKeranjangDet;
        };
      })({}),
      []
    );
    let hitung = [];
    const show = keranjang.map((row, index) => {
      hitung.push(row.harga * row.jumlah);
      return (
        <li className="flex py-2" key={index}>
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={row.gambar}
              alt="Gambar Jualan"
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between items-start text-base font-medium text-gray-900">
                <h3>
                  <a href="#">{row.nama}</a>
                </h3>
                <div>
                  {/* harga asli */}
                  <p className="ml-4">{showRupiah(row.harga)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-between text-sm">
              <div className="flex gap-4 items-center">
                <p className="text-gray-500">Jumlah</p>
                <div className="flex gap-1 items-center border rounded-xl">
                  <button
                    className="border bg-biru rounded-full w-5 text-black"
                    onClick={() => handelTambah(row)}
                  >
                    +
                  </button>
                  <span>{row.jumlah}</span>
                  <button
                    className="border bg-hijau rounded-full w-5 text-black"
                    onClick={() => handelKurang(row)}
                  >
                    -
                  </button>
                </div>
              </div>

              <div className="flex">
                {row.jumlah > 1 && (
                  <p className="ml-4">{showRupiah(row.harga * row.jumlah)}</p>
                )}
                {/* hitung total */}
              </div>
            </div>
          </div>
        </li>
      );
    });
    hitungTotal(hitung);
    return show;
  };
  let total;
  const hitungTotal = (data) => {
    const jumlah = data.reduce((a, b) => a + b, 0);
    total = jumlah;
  };

  // effect ongkir
  useEffect(() => {
    if (dt_pembeli) {
      showOngkir(dt_pembeli.kelurahan_id);
    }
  }, [dt_pembeli]);

  // lanjut pembayaran
  const handlePembayaran = async (row, total_belanja, harga_ongkir) => {
    Swal.fire({
      title: "Yakin melanjutkan?",
      text: "Setelah melanjutkan ke proses pembayaran, barang tidak bisa dikembalikan lagi ke keranjang.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const keranjang_id = row[0].keranjang_id;
        // update data keranjang
        await updateData(keranjang_id, "finish");
        // tambah data pembayaran
        const { status } = await addData(
          keranjang_id,
          total_belanja,
          harga_ongkir,
          "belum bayar"
        );
        if (status !== "error") {
          navigate("/user/checkout");
          // window.location.reload();
        }
      }
    });
  };

  return (
    <div className="pointer-events-auto w-screen max-w-md">
      {dtKeranjangDet.length > 0 ? (
        <div className="flex flex-col overflow-auto bg-white shadow-xl h-[80vh]">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h2
                className="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                Belanjaan
              </h2>
            </div>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartDetail()}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Belanja</p>
              <p>{showRupiah(total)}</p>
            </div>
            {dtOngkir ? (
              <>
                <div className="mt-0.5 text-sm text-gray-500 flex justify-between">
                  <p>Ongkos Kirim</p>
                  <p>{showRupiah(dtOngkir.harga)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Bayar</p>
                  <p>{showRupiah(dtOngkir.harga + total)}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() =>
                      handlePembayaran(dtKeranjangDet, total, dtOngkir.harga)
                    }
                    className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pembayaran
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-center text-merah text-sm mt-3 cursor-text">
                  Mohom maaf anda tidak bisa melanjutkan ke tahap pembayaran
                  dikarenakan lokasi anda belum bisa dikirim. Silahkan
                  menghubungi admin.
                </h1>
              </>
            )}
          </div>
        </div>
      ) : (
        <h1 className="font-Arvo-Bold text-merah text-center text-sm mb-2">
          Belum Ada Belanjaan
        </h1>
      )}
    </div>
  );
};

export default Cart;
