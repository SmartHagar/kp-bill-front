/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const usePembeli = create(
  devtools((set, get) => ({
    dtPembeli: [],
    responses: [],
    setPembeli: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/pembeli`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtPembeli: response.data.data }));
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
    getPembeli: async (id) => {
      try {
        const response = await crud({
          method: "get",
          url: `/pembeli/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtPembeli: response.data.data }));
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
          url: `/pembeli`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: items,
        });
        set((state) => ({
          dtPembeli: [res.data.data, ...state.dtPembeli],
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
          url: `/pembeli/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtPembeli: state.dtPembeli.filter((item) => item.id !== id),
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
          url: `/pembeli/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set((state) => ({
          dtPembeli: state.dtPembeli.map((item) => {
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

export default usePembeli;
