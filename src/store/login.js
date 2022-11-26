/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../services/base_url";
import useKeranjang from "./crud/keranjang";

const { auth, crud } = useUrl();

const user_login = JSON.parse(localStorage.getItem("user_login"));
let getToken;

user_login && (getToken = user_login.token);

const useLogin = create(
  devtools((set, get) => ({
    login: [],
    setLogin: async (item) => {
      try {
        const response = await auth.post(`/login`, item);
        set((state) => ({ ...state, login: response.data.data }));
        // save data login to local storage
        const user = {
          user_id: response.data.user.id,
          role: response.data.user.role,
          token: response.data.access_token,
        };
        localStorage.setItem("user_login", JSON.stringify(user));

        // cek data pembeli
        const cekDtPembeli = await crud.get(`/pembeli/${user.user_id}`);
        if (cekDtPembeli && cekDtPembeli.data.data) {
          localStorage.setItem(
            "dt_pembeli",
            JSON.stringify(cekDtPembeli.data.data)
          );
          // cek keranjang_id
          const pembeli_id = cekDtPembeli.data.data.id;
          const cekKeranjang = await useKeranjang
            .getState()
            .setKeranjang(pembeli_id, "finish");
          if (
            cekKeranjang &&
            cekKeranjang.data &&
            cekKeranjang.data.data.length > 0
          ) {
            localStorage.setItem("keranjang_id", cekKeranjang.data.data[0].id);
          }
        }

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
    setLogout: async () => {
      try {
        const res = await auth({
          method: "post",
          url: `/logout`,
          headers: { Authorization: `Bearer ${getToken}` },
        });
        localStorage.removeItem("user_login");
        localStorage.removeItem("dt_pembeli");
        localStorage.removeItem("keranjang_id");
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useLogin;
