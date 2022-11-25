/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useDistrik = create(
  devtools((set, get) => ({
    dtDistrik: [],
    responses: [],
    setDistrik: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/distrik`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtDistrik: response.data.data }));
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
    addData: async (nama) => {
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/distrik`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: { nama },
        });
        set((state) => ({
          dtDistrik: [res.data.data, ...state.dtDistrik],
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
          url: `/distrik/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtDistrik: state.dtDistrik.filter((item) => item.id !== id),
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
          url: `/distrik/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: { nama },
        });
        set((state) => ({
          dtDistrik: state.dtDistrik.map((item) => {
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

export default useDistrik;
