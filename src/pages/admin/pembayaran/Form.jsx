/** @format */

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import useKelurahan from "../../../store/crud/kelurahan";
import SelectSearch from "../../../components/select/SelectSearch";
import usePembayaran from "../../../store/crud/pembayaran";

const Form = ({ open, setOpen, dataEdit, cekEdit, setPesan }) => {
  const [status, setStatus] = useState("");

  const { updateData, addData } = usePembayaran();

  useEffect(() => {
    if (cekEdit) {
      return dataEdit.status && setStatus(dataEdit.status);
    }
  }, [cekEdit, dataEdit]);

  const handleSimpan = async (e) => {
    e.preventDefault();
    const items = {
      status,
    };
    let cek;
    cek = await updateData(dataEdit.id, items);
    setOpen(false);

    if (cek.status === "berhasil") {
      setStatus("");
    }
  };
  return (
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader className="font-corben-bold text-lg">
        Form data pembayaran
      </DialogHeader>
      <hr />
      <form onSubmit={handleSimpan} className="mt-4">
        <DialogBody className="flex flex-wrap gap-5">
          <div className="w-full font-coustard-regular">
            <label className="text-sm">Pilh Status</label>
            <select
              id="StatusNikah"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="w-full px-2 py-2 bg-white rounded text-sm border shadow outline-none focus:outline-none focus:ring"
            >
              // belum bayar, dibayar, pengantaran, selesai
              <option value="belum bayar">Belum Bayar</option>
              <option value="dibayar">Dibayar</option>
              <option value="pengantaran">Pengantaran</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button color="red" type="submit">
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default Form;
