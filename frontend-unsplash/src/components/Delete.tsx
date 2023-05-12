import React from "react";
import { IPhotoData } from "./HomePage/page";


interface IDelete {
    photoFormhandler: (args: boolean) => void;
    setPhotoList: (args: IPhotoData[]) => void;
    selectedPhoto: IPhotoData | undefined;
  }
const Delete = ({selectedPhoto, photoFormhandler, setPhotoList}: IDelete) => {
  return (
    <div className="fixed z-[1000] bg-black-100/25 h-[100vh] w-[100vw] flex justify-center">
      <form className="absolute z-10 w-[620px] rounded-[12px] bg-white flex flex-col top-[20%] p-5">
        <label className="text-primary text-[24px] font-[500] mb-[20px]">
          Are you sure?
        </label>
        <label className="text-primary text-[14px] font-[500] mb-[10px]">
          Password
        </label>
        <input
          type="password"
          className="w-[100%] h-[55px] rounded-[12px] border-[1px] border-tertiary outline-none pl-3 text-primary focus:border-green mb-[20px]"
        />
        <div className="w-full flex">
        <button className="min-w-auto h-[55px] text-tertiary rounded-[12px] bg-none active:scale-[0.95] ml-auto" onClick={(e: any) => {
            e.preventDefault()
            photoFormhandler(false)
          }}>
            Cancel
          </button>
          <button className="min-w-[150px] h-[55px] text-white rounded-[12px] bg-red active:scale-[0.95] ml-3">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Delete;
