/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { crud } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useGambar = create(
  devtools((set, get) => ({
    dtGambar: [],
    responses: [],
    setGambar: async (search = "", page = "", limit = "") => {
      try {
        const response = await crud({
          method: "get",
          url: `/gambar`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            limit,
            search,
            page,
          },
        });
        set((state) => ({ ...state, responses: response.data }));
        set((state) => ({ ...state, dtGambar: response.data.data }));
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
      formData.append("jenis", items.jenis);
      formData.append("path", items.gambar);
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/gambar`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: formData,
        });
        set((state) => ({
          dtGambar: [res.data.data, ...state.dtGambar],
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
          url: `/gambar/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          dtGambar: state.dtGambar.filter((item) => item.id !== id),
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
      formData.append("jenis", items.jenis);
      formData.append("path", items.gambar);
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: "post",
          url: `/gambar/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: formData,
          params: {
            _method: "PUT",
          },
        });
        set((state) => ({
          dtGambar: state.dtGambar.map((item) => {
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

export default useGambar;
