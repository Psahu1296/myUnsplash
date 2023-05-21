import React, { useEffect, useState } from "react";
import { IPhotoData } from "./HomePage/page";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface IAddNew {
  photoFormhandler: (args: boolean) => void;
  setPhotoList: (args: IPhotoData[]) => void;
  photoList: IPhotoData[];
  setIsLoading: (args: boolean) => void;
}
const AddNew = ({
  photoList,
  photoFormhandler,
  setPhotoList,
  setIsLoading,
}: IAddNew) => {
  const [form, setForm] = useState<IPhotoData>({
    label: "",
    imageURL: "",
    date: null,
  });

  const addPhtoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Label") {
      setForm({ ...form, label: e.target.value });
      return;
    }
    setForm({ ...form, imageURL: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const date = new Date()
      const updateId = { ...form, date };
      const data = [updateId, ...photoList];
      setPhotoList([updateId, ...photoList]);
      const response = await axios.post("http://localhost:5000/image", {
        ...updateId,
      });
    } catch (error) {
      console.log("mongodb error: ", error);
      alert("something went wrong");
    } finally {
      photoFormhandler(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed z-[1000] bg-black-100/25 h-[100vh] w-[100vw] flex justify-center">
      <form
        className="absolute z-10 w-[620px] rounded-[12px] bg-white flex flex-col top-[20%] p-5"
        onSubmit={onSubmitHandler}
      >
        <label className="text-primary text-[24px] font-[500] mb-[20px]">
          Add a new photo
        </label>
        <label className="text-primary text-[14px] font-[500] mb-[10px]">
          Label
        </label>
        <input
          type="text"
          className="w-[100%] h-[55px] rounded-[12px] border-[1px] border-tertiary outline-none pl-3 text-primary focus:border-green mb-[20px]"
          value={form.label}
          name="Label"
          onChange={addPhtoHandler}
        />
        <label className="text-primary text-[14px] font-[500] mb-[10px]">
          Photo URL
        </label>
        <input
          type="text"
          className="w-[100%] h-[55px] rounded-[12px] border-[1px] border-tertiary outline-none px-3 text-primary focus:border-green mb-[25px] text-ellipsis overflow-hidden"
          value={form.imageURL}
          onChange={addPhtoHandler}
        />
        <div className="w-full flex">
          <button
            className="min-w-auto h-[55px] text-tertiary rounded-[12px] bg-none active:scale-[0.95] ml-auto"
            onClick={(e: any) => {
              e.preventDefault();
              photoFormhandler(false);
            }}
          >
            Cancel
          </button>
          <button className="min-w-[150px] h-[55px] text-white rounded-[12px] bg-green active:scale-[0.95] ml-3">
            Add Photo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNew;
