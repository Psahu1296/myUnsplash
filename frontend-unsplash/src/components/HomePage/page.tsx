"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IMAGE_DATA } from "./dummy";
import "../../app/globals.css";
import axios from "axios";
import Logo from "../../app/assets/ps-logo.png";
import dynamic from "next/dynamic";
import Delete from "../Delete";
import Loader from "../Loader";
const AddNew = dynamic(() => import("@/components/AddNew"), {
  ssr: false,
});
export interface IPhotoData {
  id: string
  label: string;
  imageURL: string;
}
const FrontPage = () => {
  const [PhotoList, setPhotoList] = useState<IPhotoData[]>(IMAGE_DATA);
  const [addPhoto, setAddPhoto] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<IPhotoData>();
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const photoFormhandler = (args: boolean) => {
    setAddPhoto(args);
  };
  const photoDeleteHandler = (args: boolean) => {
    setDeletePhoto(args);
  };

  const hoverHandler = (e: any) => {
    setActiveImage(e.target);
    const button = e.target.firstElementChild;
    const pTag = e.target.lastElementChild;
    button?.classList.add("active");
    pTag?.classList.add("active");
  };

  const outHandler = (e: any) => {
    var element = e.toElement || e.relatedTarget;

    if (activeImage) {
      if (
        element == activeImage.firstElementChild ||
        element == activeImage.childNodes[1]
      ) {
        setActiveImage(null);
        return;
      }
      const button = activeImage.firstElementChild;
      const pTag = activeImage.lastElementChild;
      button?.classList.remove("active");
      pTag?.classList.remove("active");
    }
  };

  useEffect(() => {
    const images = document.querySelectorAll(`[data-key="image-container"]`);
    images.forEach((image) => {
      image.addEventListener("mouseenter", hoverHandler);
      image.addEventListener("mouseout", outHandler, true);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("mouseenter", hoverHandler);
        image.removeEventListener("mouseout", outHandler);
      });
    };
  });
  return (
    <>
      <Loader isLoading={isLoading} />
      {addPhoto && (
        <AddNew
          photoFormhandler={photoFormhandler}
          setPhotoList={setPhotoList}
          photoList={PhotoList}
          setIsLoading={setIsLoading}
        />
      )}
      {deletePhoto && (
        <Delete
          photoFormhandler={photoDeleteHandler}
          setPhotoList={setPhotoList}
          selectedPhoto={selectedImage}
          photoList={PhotoList}
          setIsLoading={setIsLoading}
        />
      )}
      <div className="flex flex-col justify-center item-center w-auto p-5">
        <div className="w-[100%] h-[55px] flex justify-between">
          <div className="w-150 h-auto flex items-center">
            <Image src={Logo} alt="logo" width={56} height={32} />
            <div className="flex flex-col">
              <p className="text-primary text-[14px] font-[800] mr-5">
                My Unsplash
              </p>
              <p className="text-primary font-[500] text-[12px] mr-5">
                Pushpendra.dev
              </p>
            </div>
            <input
              type="text"
              className="w-[300px] h-[55px] rounded-[12px] border-[1px] border-tertiary outline-none pl-3 text-primary focus:border-green"
            />
          </div>
          <button
            className="min-w-[150px] h-[55px] text-white rounded-[12px] bg-green active:scale-[0.95]"
            onClick={() => photoFormhandler(true)}
          >
            Add Photo
          </button>
        </div>
        <div className="z-0">
          <div className="grid items-center mt-5 bg-white">
            <div
              ref={imageRef}
              className="mx-auto sm:columns-2 md:columns-3 max-w-7xl"
            >
              {PhotoList.map((images, indx: number) => (
                <div
                  data-key="image-container"
                  key={`${images.label}-${indx}`}
                  className="relative mb-5 w-screen sm:w-auto -ml-4 sm:ml-0 rounded-[12px] cursor-pointer"
                >
                  <button
                    ref={buttonRef}
                    className="hidden absolute top-[18px] right-[18px] text-red font-[500] text-[10px] rounded-[12px] bg-none border-[1px] border-red active:scale-[0.95] px-[15px] py-[5px]"
                    onClick={() => {
                      setDeletePhoto(true)
                      setSelectedImage(images)
                    }}
                  >
                    delete
                  </button>
                  <img
                    src={images.imageURL}
                    alt={images.label}
                    className="w-full object-contain rounded-[12px]"
                    loading="lazy"
                  />
                  <p
                    ref={labelRef}
                    className="hidden absolute bottom-[35px] left-[25px] text-[18px] font-[700] text-white w-[290px] leading-[22px] pointer-events-none"
                  >
                    {images.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrontPage;
