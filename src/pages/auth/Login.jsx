/** @format */

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import toastError from "../../services/toast-error";
import useLogin from "../../store/login";

import bgLogin from "../../assets/images/bg-login.jpg";

const LoginPage = () => {
  // store
  const { setLogin } = useLogin();
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // navigation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validator.isEmail(email)) {
      return toastError("Format Email Salah");
    }
    const items = {
      email,
      password,
    };
    const cek = await setLogin(items);
    if (cek.status === "error") {
      toastError(cek.error.message);
    }
    if (cek.status === "berhasil") {
      navigate("/auth/cek-login");
    }
    setIsLoading(false);
  };

  // cek apakah sdh login
  useEffect(() => {
    const user_login = JSON.parse(localStorage.getItem("user_login"));
    if (user_login) {
      navigate("/auth/cek-login");
    }
  }, []);

  return (
    <div>
      <Toaster />
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src={bgLogin}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {/* Welcome to Squid 🦑 */}
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum. */}
              </p>
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center px-8 py-8 sm:px-12 lg:py-12 lg:px-16 col-span-6 justify-center"
          >
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                {/* <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Squid 🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p> */}
              </div>

              <form
                onSubmit={handleLogin}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    id="Email"
                    name="email"
                    className="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-md outline-indigo-500"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-md outline-indigo-500"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  {isLoading ? (
                    <div>
                      <div aria-label="Loading..." role="status">
                        <svg
                          className="h-6 w-6 animate-spin"
                          viewBox="3 3 18 18"
                        >
                          <path
                            className="fill-gray-200"
                            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                          ></path>
                          <path
                            className="fill-gray-800"
                            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Login
                    </button>
                  )}

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Belum punya akun? Silahkan klik
                    <Link
                      to="/auth/register"
                      className="text-gray-700 underline ml-2"
                    >
                      Daftar
                    </Link>
                    .
                  </p>
                </div>
              </form>
              <div className="w-full flex justify-center mt-10">
                <Link to="/user/dashboard">
                  <span className="text-gray-700 underline underline-offset-2 hover:text-blue-600">
                    Kembali Ke Halaman Utama
                  </span>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
