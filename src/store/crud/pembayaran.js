/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";
import useKeranjang from "./keranjang";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();
// const updateDataKeranjang = keranjang.updateData();

// const getToken = JSON.parse(localStorage.getItem("token"));

const usePembayaran = create(
  devtools((set, get) => ({
    dtPembayaran: [],
    responses: [],
    setPembayaran: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/pembayaran`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtPembayaran: response.data.data }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    addData: async (keranjang_id, total_belanja, harga_ongkir, status) => {
      try {
        const res = await crud({
          method: "post",
          url: `/pembayaran`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: {
            keranjang_id,
            total_belanja,
            harga_ongkir,
            status,
          },
        });
        set((state) => ({
          dtPembayaran: [res.data.data, ...state.dtPembayaran],
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: `Error ${error}`,
        };
      }
    },
    removeData: async (id) => {
      try {
        const res = await crud({
          method: "delete",
          url: `/pembayaran/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtPembayaran: state.dtPembayaran.filter((item) => item.id !== id),
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
    updateData: async (id, nama) => {
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "put",
          url: `/pembayaran/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: { nama },
        });
        set((state) => ({
          dtPembayaran: state.dtPembayaran.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                nama,
              };
            } else {
              return item;
            }
          }),
        }));
        return {
          status: "berhasil",
          data: response.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default usePembayaran;
