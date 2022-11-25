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
import useDistrik from "../../../store/crud/distrik";

const Form = ({ open, setOpen, dataEdit, cekEdit, setPesan }) => {
  const [nama, setNama] = useState("");

  const { updateData, addData, dtDistrik } = useDistrik();

  useEffect(() => {
    if (cekEdit) {
      return dataEdit.nama && setNama(dataEdit.nama);
    }
    setNama("");
  }, [cekEdit, dataEdit]);

  const handleSimpan = async (e) => {
    e.preventDefault();
    let cek;
    if (cekEdit) {
      cek = await updateData(dataEdit.id, nama);
      setOpen(false);
      console.log(cek);
      setPesan(cek.data);
    } else {
      cek = await addData(nama);
      console.log(cek);
      setPesan(cek.data);
    }
    if (cek.status === "berhasil") {
      setNama("");
    }
  };
  return (
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader className="font-corben-bold text-lg">
        Form data distrik
      </DialogHeader>
      <hr />
      <form onSubmit={handleSimpan} className="mt-4">
        <DialogBody>
          <div className="w-full font-coustard-regular">
            <Input
              value={nama}
              variant="static"
              color="gray"
              label="Nama Distrik"
              placeholder="Masukan nama distrik"
              onChange={(e) => {
                setNama(e.target.value);
              }}
              required
            />
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
