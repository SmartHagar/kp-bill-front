/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { api } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useKeranjangDetAPI = create(
  devtools((set, get) => ({
    dtKeranjangBarang: [],
    setKeranjangBarang: async (keranjang_id, barang_id) => {
      try {
        const res = await api({
          method: "get",
          url: `/keranjang-barang`,
          params: {
            keranjang_id,
            barang_id,
          },
        });
        set((state) => ({ ...state, dtKeranjangBarang: res.data }));
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
  }))
);

export default useKeranjangDetAPI;
