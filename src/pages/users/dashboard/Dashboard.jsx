/** @format */

import React from "react";
import { useEffect } from "react";
import useApiGambar from "../../../store/api/gambar";
import { motion } from "framer-motion";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Dashboard = () => {
  const { setGambar, dtGambar } = useApiGambar();
  useEffect(() => {
    setGambar("slide");
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-2"
    >
      <h1 className="font-CrimsonText-Bold text-2xl text-center text-biru">
        Selamat datang di website Keramba
      </h1>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {dtGambar &&
            dtGambar.map((row, index) => (
              <SwiperSlide key={index}>
                <img
                  className="object-cover object-center m-auto h-[74vh] rounded-xl"
                  src={row.path}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Dashboard;
