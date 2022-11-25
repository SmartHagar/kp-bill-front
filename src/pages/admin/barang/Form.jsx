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
import SelectSearch from "../../../components/select/SelectSearch";
import useBarang from "../../../store/crud/barang";

const Form = ({ open, setOpen, dataEdit, cekEdit, setPesan }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [satuan, setSatuan] = useState("");
  const [stok, setStok] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { updateData, addData } = useBarang();

  useEffect(() => {
    if (cekEdit) {
      return (
        dataEdit.satuan &&
          setSatuan({
            value: dataEdit.satuan,
            label: dataEdit.satuan,
          }),
        dataEdit.nama && setNama(dataEdit.nama),
        dataEdit.harga && setHarga(dataEdit.harga),
        dataEdit.stok && setStok(dataEdit.stok),
        dataEdit.gambar && setPreviewImage(dataEdit.gambar)
      );
    }
    resetForm();
  }, [cekEdit, dataEdit]);

  const resetForm = () => {
    setNama("");
    setHarga("");
    setSatuan("");
    setStok("");
    setPreviewImage(null);
  };

  const handleSimpan = async (e) => {
    const items = {
      satuan: satuan.value,
      nama,
      harga,
      stok,
      gambar: selectedFile,
    };
    e.preventDefault();
    let cek;
    if (cekEdit) {
      cek = await updateData(dataEdit.id, items);
      setOpen(false);
      console.log(cek);
      setPesan(cek.data);
    } else {
      cek = await addData(items);
      console.log(cek);
      setPesan(cek.data);
    }
    if (cek.status === "berhasil") {
      resetForm();
    }
  };

  const options = [
    {
      value: "Kilo Gram",
      label: `Kilo Gram`,
    },
    {
      value: "Gram",
      label: `Gram`,
    },
  ];

  const onSelectFile = (event) => {
    const file = event.target.files[0];
    // console.log(file, typeof file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setPreviewImage(reader.result);
    };
    setSelectedFile(file);
  };

  return (
    <Dialog open={open} handler={() => setOpen(false)} className="min-h-fit">
      <DialogHeader className="font-corben-bold text-lg">
        Form data barang
      </DialogHeader>
      <hr />
      <form onSubmit={handleSimpan}>
        <DialogBody className="flex flex-wrap gap-3">
          <div className="w-full font-coustard-regular mt-3">
            <Input
              value={nama}
              variant="static"
              color="gray"
              label="Nama Barang"
              placeholder="Masukan Nama Barang"
              onChange={(e) => {
                setNama(e.target.value);
              }}
              required
            />
          </div>
          <div className="w-full font-coustard-regular mt-3">
            <Input
              value={harga}
              type={"number"}
              variant="static"
              color="gray"
              label="Harga Barang"
              placeholder="Masukan harga Barang"
              onChange={(e) => {
                setHarga(e.target.value);
              }}
              required
            />
          </div>

          <div className="w-full font-coustard-regular">
            <label className="text-sm">Pilh Satuan</label>
            <SelectSearch
              value={satuan}
              onChange={setSatuan}
              options={options}
              id="satuan"
              required
            />
          </div>

          <div className="w-full font-coustard-regular mt-3">
            <Input
              value={stok}
              type={"number"}
              variant="static"
              color="gray"
              label="Stok Barang"
              placeholder="Masukan stok Barang"
              onChange={(e) => {
                setStok(e.target.value);
              }}
              required
            />
          </div>

          <div className="w-full font-coustard-regular">
            <label className="text-sm">Pilh Gambar</label>
            <Input
              type={"file"}
              accept="image/png, image/jpeg, image/jpg"
              multiple={false}
              onChange={onSelectFile}
            />
            {previewImage && (
              <div>
                {console.log(selectedFile)}
                <img
                  src={previewImage}
                  alt="selected"
                  className="h-44 mt-2 rounded-md"
                />
              </div>
            )}
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
