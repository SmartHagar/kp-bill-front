/** @format */

import toast from "react-hot-toast";

const toastError = (pesan) => {
  // if (event.judul === "Berhasil") {
  toast.error(pesan, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid #f70707",
      padding: "8px",
      color: "#f70707",
    },
    iconTheme: {
      primary: "#f70707",
      secondary: "#FFFAEE",
    },
  });
  //   NotificationManager.success(event.pesan, event.judul);
  // }
};

export default toastError;
