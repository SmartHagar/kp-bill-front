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
import useOngkir from "../../../store/crud/ongkir";

const Form = ({ open, setOpen, dataEdit, cekEdit, setPesan }) => {
  const [harga, setHarga] = useState("");
  const [kelurahan, setDtKelurahan] = useState("");

  const { dtKelurahan, setKelurahan } = useKelurahan();
  const { updateData, addData } = useOngkir();

  useEffect(() => {
    setKelurahan();
    if (cekEdit) {
      return (
        dataEdit.kelurahan &&
          setDtKelurahan({
            value: dataEdit.kelurahan.id,
            label: dataEdit.kelurahan.nama,
          }),
        dataEdit.harga && setHarga(dataEdit.harga)
      );
    }
    setHarga("");
  }, [cekEdit, dataEdit]);

  const options = dtKelurahan.map(function (kelurahan) {
    return {
      value: kelurahan.id,
      label: `${kelurahan.nama}`,
    };
  });

  const handleSimpan = async (e) => {
    e.preventDefault();
    const items = {
      kelurahan_id: kelurahan.value,
      harga,
    };
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
      setHarga("");
      setDtKelurahan("");
    }
  };
  return (
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader className="font-corben-bold text-lg">
        Form data ongkir
      </DialogHeader>
      <hr />
      <form onSubmit={handleSimpan} className="mt-4">
        <DialogBody className="flex flex-wrap gap-5">
          <div className="w-full font-coustard-regular">
            <Input
              value={harga}
              variant="static"
              color="gray"
              label="Harga Ongkir"
              placeholder="Masukan harga ongkir"
              onChange={(e) => {
                setHarga(e.target.value);
              }}
              required
            />
          </div>
          <div className="w-full font-coustard-regular">
            <label className="text-sm">Pilh Kelurahan</label>
            <SelectSearch
              value={kelurahan}
              onChange={setDtKelurahan}
              options={options}
              id="kelurahan"
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
