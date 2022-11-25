/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useKeranjang = create(
  devtools((set, get) => ({
    dtKeranjang: [],
    responses: [],
    setKeranjang: async (pembeli_id, status = "proses") => {
      try {
        const response = await crud({
          method: "get",
          url: `/keranjang`,
          params: {
            pembeli_id,
            status,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtKeranjang: response.data.data }));
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
    addData: async (id) => {
      try {
        const res = await crud({
          method: "post",
          url: `/keranjang`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: {
            pembeli_id: id,
            status: "proses",
          },
        });
        set((state) => ({
          dtKeranjang: [res.data.data, ...state.dtKeranjang],
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
          url: `/keranjang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtKeranjang: state.dtKeranjang.filter((item) => item.id !== id),
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
    updateData: async (id, status) => {
      try {
        const response = await crud({
          method: "put",
          url: `/keranjang/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: { status },
        });
        set((state) => ({
          dtKeranjang: state.dtKeranjang.map((item) => {
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

export default useKeranjang;
