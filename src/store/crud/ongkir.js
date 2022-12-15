/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useOngkir = create(
  devtools((set, get) => ({
    dtOngkir: [],
    responses: [],
    setOngkir: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/ongkir`,
          params: {
            limit,
            search,
            page,
          },
        });

        const { data } = response.data;
        // sort by nama kelurahan
        function compare(a, b) {
          if (a.kelurahan.nama < b.kelurahan.nama) {
            return -1;
          }
          if (a.kelurahan.nama > b.kelurahan.nama) {
            return 1;
          }
          return 0;
        }

        data.sort(compare);

        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtOngkir: data }));
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
    showOngkir: async (kelurahan_id) => {
      try {
        const response = await crud({
          method: "get",
          url: `/ongkir/${kelurahan_id}`,
        });
        set((state) => ({ ...state, dtOngkir: response.data }));
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
          url: `/ongkir`,
          data: items,
        });
        set((state) => ({
          dtOngkir: [res.data.data, ...state.dtOngkir],
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
          url: `/ongkir/${id}`,
        });
        set((state) => ({
          dtOngkir: state.dtOngkir.filter((item) => item.id !== id),
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
          url: `/ongkir/${id}`,
          data: row,
        });
        set((state) => ({
          dtOngkir: state.dtOngkir.map((item) => {
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

export default useOngkir;
