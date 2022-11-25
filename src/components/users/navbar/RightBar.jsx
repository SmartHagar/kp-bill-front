/** @format */

import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useKeranjang from "../../../store/crud/keranjang";
import useKeranjangDet from "../../../store/crud/keranjang-det";
import useLogin from "../../../store/login";
import Cart from "../cart/Cart";

const RightBar = () => {
  // store
  const { setLogout } = useLogin();
  const { setKeranjang } = useKeranjang();
  const { setKeranjangDet, dtKeranjangDet } = useKeranjangDet();
  // state
  const [keranjangId, setKeranjangId] = useState("kosong");
  const [idPembeli, setIdPembeli] = useState("kosong");

  // cek data cart
  // use effect berdasarkan dt_pembeli
  const dt_pembeli = JSON.parse(localStorage.getItem("dt_pembeli"));
  const keranjang_id = localStorage.getItem("keranjang_id");
  // cek keranjang detail
  const keranjangDet = () => {
    if (keranjangId !== "kosong") {
      setKeranjangDet(keranjangId);
    }
  };
  // cek data pembeli
  useEffect(() => {
    if (dt_pembeli) {
      setIdPembeli(dt_pembeli.id);
    } else {
      setIdPembeli(null);
    }
  }, [dt_pembeli]);
  // cek Keranjang
  useEffect(() => {
    const cekKeranjang = async (id) => {
      const cek = await setKeranjang(id);
      if (cek.data.data.length > 0) {
        setKeranjangId(cek.data.data[0].id);
      }
    };
    if (idPembeli !== "kosong") {
      cekKeranjang(idPembeli).catch(console.error);
    }
    if (!idPembeli) {
      setKeranjangId(null);
    }
    keranjangDet();
  }, [idPembeli, keranjangId]);

  // navigasi
  const navigate = useNavigate();
  // state
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // cek login
  const user_login = JSON.parse(localStorage.getItem("user_login"));

  const handleCart = (event) => {
    setShowCart(event);
    setShowProfile(false);
  };

  const handleProfile = () => {
    setShowProfile(!showProfile);
    setShowCart(false);
  };

  const handleLogout = async () => {
    const res = await setLogout();
    if (res.status === "berhasil") {
      navigate("/user/dashboard");
    }
  };
  return (
    <div className="flex gap-6 font-Arvo-Regular text-sm">
      {/* keranjang */}
      <div
        className="cursor-pointer"
        onMouseEnter={() => handleCart(true)}
        onMouseLeave={() => handleCart(false)}
      >
        <div className="flex">
          <AiOutlineShoppingCart size={20} />
          {dtKeranjangDet.length > 0 && (
            <div className="relative text-xs bg-merah w-4 h-4 rounded-full flex justify-center items-center text-white font-bold">
              <span>{dtKeranjangDet.length}</span>
            </div>
          )}
        </div>
        <div className="relative flex justify-center">
          <div
            className={
              showCart ? "absolute -right-4 z-10 select-none pt-2" : "hidden"
            }
          >
            <div className="flex border border-gray-300 bg-white rounded-sm pt-3">
              <Cart dtKeranjangDet={dtKeranjangDet} dt_pembeli={dt_pembeli} />
            </div>
          </div>
        </div>
      </div>
      {/* profile */}
      <div
        className="cursor-pointer"
        onMouseEnter={() => handleProfile(true)}
        onMouseLeave={() => handleProfile(false)}
      >
        <AiOutlineUser size={20} />
        <div className="relative flex justify-center">
          <div
            className={
              showProfile ? "absolute z-10 select-none w-32 pt-2" : "hidden"
            }
          >
            <div className="flex border border-gray-300 bg-white px-4 rounded-sm pt-3">
              <ul>
                <Link to="/user/personal">
                  <li className="pb-3 hover:text-biru">Akun Saya</li>
                </Link>
                {!user_login ? (
                  <>
                    <Link to="/auth/login">
                      <li className="pb-3 hover:text-biru">Masuk</li>
                    </Link>
                    <Link to="/auth/register">
                      <li className="pb-3 hover:text-biru">Daftar</li>
                    </Link>
                  </>
                ) : (
                  <>
                    <div onClick={handleLogout}>
                      <li className="pb-3 hover:text-biru">Logout</li>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
