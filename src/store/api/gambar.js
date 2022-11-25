/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { api } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useApiGambar = create(
  devtools((set, get) => ({
    dtGambar: [],
    setGambar: async (search) => {
      try {
        const response = await api({
          method: "get",
          url: `/gambar`,
          params: {
            search,
          },
        });
        set((state) => ({ ...state, dtGambar: response.data }));
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

export default useApiGambar;
