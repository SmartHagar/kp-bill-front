/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useKeranjangDet = create(
  devtools((set, get) => ({
    dtKeranjangDet: [],
    responses: [],
    setKeranjangDet: async (keranjang_id) => {
      try {
        const response = await crud({
          method: "get",
          url: `/keranjang-det`,
          params: {
            keranjang_id,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtKeranjangDet: response.data.data }));
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
    addDataDet: async (keranjang_id, barang_id) => {
      try {
        const res = await crud({
          method: "post",
          url: `/keranjang-det`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: {
            keranjang_id,
            barang_id,
          },
        });
        set((state) => ({
          dtKeranjangDet: [res.data.data, ...state.dtKeranjangDet],
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
          url: `/keranjang-det/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtKeranjangDet: state.dtKeranjangDet.filter((item) => item.id !== id),
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
          url: `/keranjang-det/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        set((state) => ({
          dtKeranjangDet: state.dtKeranjangDet.map((item) => {
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

export default useKeranjangDet;
