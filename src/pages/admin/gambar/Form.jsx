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
import useGambar from "../../../store/crud/gambar";
import SelectSearch from "../../../components/select/SelectSearch";

const Form = ({ open, setOpen, dataEdit, cekEdit, setPesan }) => {
  const [jenis, setJenis] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ket, setKet] = useState("");

  const { updateData, addData } = useGambar();

  useEffect(() => {
    if (cekEdit) {
      return (
        dataEdit.jenis &&
          setJenis({
            value: dataEdit.jenis,
            label: dataEdit.jenis,
          }),
        dataEdit.path && setPreviewImage(dataEdit.path)
      );
    }
    resetForm();
  }, [cekEdit, dataEdit]);

  const resetForm = () => {
    setJenis("");
    setPreviewImage(null);
    setKet("");
  };

  const handleSimpan = async (e) => {
    const items = {
      jenis: jenis.value,
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
      value: "Galeri",
      label: `Galeri`,
    },
    {
      value: "Slide",
      label: `Slide`,
    },
    {
      value: "Galeri & Slide",
      label: `Galeri & Slide`,
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
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader className="font-corben-bold text-lg">
        Form data gambar
      </DialogHeader>
      <hr />
      <form onSubmit={handleSimpan}>
        <DialogBody className="flex flex-wrap gap-3">
          <div className="w-full font-coustard-regular">
            <label className="text-sm">Pilh Jenis</label>
            <SelectSearch
              value={jenis}
              onChange={setJenis}
              options={options}
              id="distrik"
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
          <div className="w-full font-coustard-regular mt-3">
            <Input
              value={ket}
              variant="static"
              color="gray"
              label="Keterangan"
              placeholder="Masukan keterangan"
              onChange={(e) => {
                setKet(e.target.value);
              }}
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
