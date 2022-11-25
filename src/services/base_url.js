/** @format */

import axios from "axios";

// const BASE_URL = "https://admin.uogp.databasemahasiswatambrauw.web.id";
const BASE_URL = "http://127.0.0.1:8000";
const url_auth = `${BASE_URL}/auth`;
const url_api = `${BASE_URL}/api`;
const url_crud = `${BASE_URL}/crud`;

export default function useUrl() {
  const auth = axios.create({
    baseURL: url_auth,
  });
  const crud = axios.create({
    baseURL: url_crud,
  });
  const api = axios.create({
    baseURL: url_api,
  });
  return { auth, crud, api, BASE_URL };
}
