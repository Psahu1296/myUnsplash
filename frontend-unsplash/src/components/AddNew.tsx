import React, { useState } from "react";
import { IPhotoData } from "./HomePage/page";
import { v4 as uuidv4 } from 'uuid';


interface IAddNew {
  photoFormhandler: (args: boolean) => void;
  setPhotoList: (args: IPhotoData[]) => void;
  photoList: IPhotoData[]
}
const AddNew = ({photoList, photoFormhandler, setPhotoList}: IAddNew) => {

  const [form, setForm] = useState<IPhotoData>({id: '', label: '', imageURL: ''});

  const addPhtoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'Label') {
      setForm({...form, label: e.target.value});
      return
    } 
    setForm({...form, imageURL: e.target.value});
    }

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    const id = uuidv4().toString();
    const updateId  = {...form, id}
    setPhotoList([updateId,...photoList])
    photoFormhandler(false)
  }
console.log(photoList)
  return (
    <div className="fixed z-[1000] bg-black-100/25 h-[100vh] w-[100vw] flex justify-center">
      <form className="absolute z-10 w-[620px] rounded-[12px] bg-white flex flex-col top-[20%] p-5" onSubmit={onSubmitHandler}>
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
          className="w-[100%] h-[55px] rounded-[12px] border-[1px] border-tertiary outline-none pl-3 text-primary focus:border-green mb-[25px]"
          value={form.imageURL}
          onChange={addPhtoHandler}
        />
        <div className="w-full flex">
          <button className="min-w-auto h-[55px] text-tertiary rounded-[12px] bg-none active:scale-[0.95] ml-auto" onClick={(e: any) => {
            e.preventDefault()
            photoFormhandler(false)
          }}>
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