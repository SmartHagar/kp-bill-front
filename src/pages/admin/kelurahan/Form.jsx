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
import useKelurahan from "../../../store/crud/kelurahan";
import SelectSearch from "../../../components/select/SelectSearch";

const Form = ({ open, setOpen, dataEdit, cekEdit, setPesan }) => {
  const [nama, setNama] = useState("");
  const [distrik, setDtDistrik] = useState("");

  const { dtDistrik, setDistrik } = useDistrik();
  const { updateData, addData } = useKelurahan();

  useEffect(() => {
    setDistrik();
    if (cekEdit) {
      return (
        dataEdit.distrik &&
          setDtDistrik({
            value: dataEdit.distrik.id,
            label: dataEdit.distrik.nama,
          }),
        dataEdit.nama && setNama(dataEdit.nama)
      );
    }
    setNama("");
  }, [cekEdit, dataEdit]);

  const options = dtDistrik.map(function (distirk) {
    return {
      value: distirk.id,
      label: `${distirk.nama}`,
    };
  });

  const handleSimpan = async (e) => {
    const items = {
      distrik_id: distrik.value,
      nama,
    };
    e.preventDefault();
    let cek;
    if (cekEdit) {
      cek = await updateData(dataEdit.id, items);
      setOpen(false);
      console.log(cek);
      // setPesan(cek.data);
    } else {
      cek = await addData(items);
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
        Form data kelurahan
      </DialogHeader>
      <hr />
      <form onSubmit={handleSimpan} className="mt-4">
        <DialogBody className="flex flex-wrap gap-5">
          <div className="w-full font-coustard-regular">
            <Input
              value={nama}
              variant="static"
              color="gray"
              label="Nama Kelurahan"
              placeholder="Masukan nama kelurahan"
              onChange={(e) => {
                setNama(e.target.value);
              }}
              required
            />
          </div>
          <div className="w-full font-coustard-regular">
            <label className="text-sm">Pilh Distrik</label>
            <SelectSearch
              value={distrik}
              onChange={setDtDistrik}
              options={options}
              id="distrik"
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
