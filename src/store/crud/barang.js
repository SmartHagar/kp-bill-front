/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useBarang = create(
  devtools((set, get) => ({
    dtBarang: [],
    responses: [],
    setBarang: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/barang`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtBarang: response.data.data }));
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
    addData: async (items) => {
      const formData = new FormData();
      formData.append("nama", items.nama);
      formData.append("harga", items.harga);
      formData.append("satuan", items.satuan);
      formData.append("stok", items.stok);
      formData.append("gambar", items.gambar);
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/barang`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: formData,
        });
        set((state) => ({
          dtBarang: [res.data.data, ...state.dtBarang],
        }));
        console.log(res);
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
          url: `/barang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtBarang: state.dtBarang.filter((item) => item.id !== id),
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
    updateData: async (id, items) => {
      const formData = new FormData();
      formData.append("nama", items.nama);
      formData.append("harga", items.harga);
      formData.append("satuan", items.satuan);
      formData.append("stok", items.stok);
      formData.append("gambar", items.gambar);
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "post",
          url: `/barang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        set((state) => ({
          dtBarang: state.dtBarang.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...response.data.data,
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

export default useBarang;
