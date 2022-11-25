/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../services/base_url";

const { auth } = useUrl();

const useRegister = create(
  devtools((set, get) => ({
    register: [],
    setRegister: async (item) => {
      try {
        const response = await auth.post(`/register`, item);
        set((state) => ({ ...state, register: response.data.data }));
        // save data register to local storage
        const user = {
          user_id: response.data.user.id,
          role: response.data.user.role,
          token: response.data.access_token,
        };
        localStorage.setItem("user_login", JSON.stringify(user));

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

export default useRegister;
