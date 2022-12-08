/** @format */

import React, { useEffect, useState } from "react";
import useApiGambar from "../../../store/api/gambar";
import { motion } from "framer-motion";
import { HiArrowSmLeft, HiArrowSmRight, HiOutlineX } from "react-icons/hi";
import "./style.css";
const Galeri = () => {
  // store
  const { setGambar, dtGambar } = useApiGambar();
  // state
  const [model, setModel] = useState(false);
  const [tmpImg, setTmpImg] = useState(null);
  const [index, setIndex] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // effect
  useEffect(() => {
    const fetch = async (page = "galeri") => {
      await setGambar(page);
      setIsLoading(false);
    };

    fetch();
  }, []);
  const getImg = (image) => {
    setTmpImg(image);
    setModel(true);
  };
  const prevPicture = () => {
    setIndex(index - 1);
  };
  const nextPicture = () => {
    setIndex(index + 1);
  };
  const showImages = () => {
    return (
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      >
        {/* card */}
        <div className="flex flex-wrap -m-1 md:-m-2 justify-center">
          {dtGambar &&
            dtGambar.map((row, index) => (
              <div
                key={index}
                className="w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <div className="w-full p-1 md:p-2 overflow-hidden">
                  <img
                    alt="gallery"
                    className="cursor-pointer lg:h-44 w-full object-cover rounded-lg"
                    src={`${row.path}`}
                    onClick={() => getImg(dtGambar, setIndex(index))}
                  />
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-wrap justify-between mx-2 md:mx-10 font-corben-regular mb-4">
      <div className="w-full text-sm min-h-[83vh]">
        <h2 className="mb-5 font-bold text-lg sm:text-2xl text-center">
          Galeri
        </h2>
        <div>
          <div className="flex flex-wrap justify-center">
            <div className={model ? "model open" : "model"}>
              {tmpImg && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  transition={{ duration: 1 }}
                >
                  <div className="h-144">
                    <img
                      className="w-4/6 m-auto"
                      src={`${tmpImg[index].path}`}
                      alt=""
                    />
                    <div className="bg-white/[0.6] py-2 font-cabin absolute left-0 bottom-3 w-full">
                      <h4 className="text-center">{tmpImg[index].ket}</h4>
                    </div>
                  </div>
                  <div id="close">
                    <HiOutlineX onClick={() => setModel(false)} />
                  </div>
                  {index > 0 && (
                    <div id="fill-left">
                      <HiArrowSmLeft onClick={prevPicture} />
                    </div>
                  )}

                  {index + 1 < tmpImg.length && (
                    <div id="fill-right">
                      <HiArrowSmRight onClick={nextPicture} />
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {isLoading ? "Loading..." : showImages()}
          </div>
        </div>
      </div>
      {/* pagination */}
      {/* <div className="mt-4 mx-auto">
        <Paginate responses={dataGaleri} setPage={setPage} />
      </div> */}
    </div>
  );
};

export default Galeri;
