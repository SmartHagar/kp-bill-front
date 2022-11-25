/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useKelurahan = create(
  devtools((set, get) => ({
    dtKelurahan: [],
    responses: [],
    setKelurahan: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/kelurahan`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtKelurahan: response.data.data }));
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
      try {
        const res = await crud({
          method: "post",
          url: `/kelurahan`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: items,
        });
        set((state) => ({
          dtKelurahan: [res.data.data, ...state.dtKelurahan],
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
          url: `/kelurahan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtKelurahan: state.dtKelurahan.filter((item) => item.id !== id),
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
    updateData: async (id, row) => {
      try {
        const response = await crud({
          method: "put",
          url: `/kelurahan/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set((state) => ({
          dtKelurahan: state.dtKelurahan.map((item) => {
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

export default useKelurahan;
