/** @format */

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

import bgLogin from "../../assets/images/bg-login.jpg";
import toastError from "../../services/toast-error";
import useRegister from "../../store/register";

const Register = () => {
  // store
  const { setRegister } = useRegister();
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passworConfirmation, setPassworConfirmation] = useState("");
  // navigation
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      return toastError("Format Email Salah");
    }
    const items = {
      email,
      password,
      password_confirmation: passworConfirmation,
    };
    const cek = await setRegister(items);
    console.log(cek);
    if (cek.status === "error") {
      toastError(cek.error.pesan);
    }
    if (cek.status === "berhasil") {
      navigate("/auth/cek-login");
    }
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
              {/* <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Squid 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p> */}
            </div>
          </section>

          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
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
                onSubmit={handleRegister}
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

                <div className="col-span-6 sm:col-span-3">
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

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password Confirmation
                  </label>

                  <input
                    onChange={(e) => setPassworConfirmation(e.target.value)}
                    required
                    type="password"
                    id="Password_confirmation"
                    name="password_confirmation"
                    className="mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-md text-gray-700 shadow-md outline-indigo-500"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Daftar
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Sudah Punya Akun? Silahkan
                    <Link
                      to="/auth/login"
                      className="text-gray-700 underline ml-2"
                    >
                      Log in
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

export default Register;
