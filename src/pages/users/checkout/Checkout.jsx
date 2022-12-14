/** @format */

import React, { useEffect } from "react";
import showRupiah from "../../../services/rupiah";
import useKeranjangDet from "../../../store/crud/keranjang-det";
import useOngkir from "../../../store/crud/ongkir";
import usePembayaran from "../../../store/crud/pembayaran";
const Checkout = () => {
  const { setKeranjangDet, dtKeranjangFinish, setKeranjangFinish } =
    useKeranjangDet();
  const { dtPembayaran } = usePembayaran();
  const { showOngkir, dtOngkir } = useOngkir();
  const keranjang_id = localStorage.getItem("keranjang_id");

  useEffect(() => {
    setKeranjangDet();
    setKeranjangFinish(keranjang_id);
  }, []);
  // cart details
  const cartDetail = () => {
    const keranjang = dtKeranjangFinish.reduce(
      (function (hash) {
        return function (dtKeranjangFinish, obj) {
          if (!hash[obj.barang_id])
            dtKeranjangFinish.push(
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
          return dtKeranjangFinish;
        };
      })({}),
      []
    );
    let hitung = [];
    const show = keranjang.map((row, index) => {
      hitung.push(row.harga * row.jumlah);
      return (
        <tr key={index}>
          <td className="whitespace-nowrap px-4 py-2 text-gray-900">
            {index + 1}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {row.nama}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {showRupiah(row.harga)}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {row.jumlah}
          </td>
          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {showRupiah(row.harga * row.jumlah)}
          </td>
        </tr>
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
  const dt_pembeli = JSON.parse(localStorage.getItem("dt_pembeli"));

  useEffect(() => {
    if (dt_pembeli) {
      showOngkir(dt_pembeli.kelurahan_id);
    }
  }, []);
  return (
    <div className="font-Arvo-Regular">
      <div>
        <h1 className="text-lg">Keranjang Belanjaan</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  No
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Barang
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Harga
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Jumlah
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Sub Total
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {cartDetail()}
              <tr>
                <td
                  colSpan={4}
                  className="whitespace-nowrap px-4 py-2 text-gray-700 text-right"
                >
                  Total Belanja
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {showRupiah(total)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="whitespace-nowrap px-4 py-2 text-gray-700 text-right"
                >
                  Ongkir
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {dtOngkir.id && showRupiah(dtOngkir.harga)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="whitespace-nowrap px-4 py-2 text-gray-700 text-right"
                >
                  Total Bayar
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {dtOngkir.id && showRupiah(dtOngkir.harga + total)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="whitespace-nowrap px-4 py-2 text-gray-700 text-right"
                >
                  Status
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 uppercase">
                  {dtPembayaran && dtPembayaran.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* status pembayaran */}
        {/* status antar */}
      </div>
    </div>
  );
};

export default Checkout;
