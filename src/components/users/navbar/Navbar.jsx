/** @format */

import React from "react";
import ListMenu from "./ListMenu";
import RightBar from "./RightBar";

const Navbar = () => {
  return (
    <div className="relative z-50 h-20">
      <header className="text-gray-600 body-font shadow-md mb-4 fixed top-0 w-full backdrop-blur-sm bg-white/50">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          {/* nama */}
          <div className="font-DancingScript-Bold text-4xl">
            <span className="text-biru">Keramba</span>
            <span className="ml-2 text-hijau">Ikan</span>
          </div>
          <ListMenu />
          <RightBar />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
