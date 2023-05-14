import React from "react";
import { Circles } from "react-loader-spinner";


interface Iloading {
    isLoading: boolean;
}
const Loader = ({isLoading}: Iloading) => {
  return (
    isLoading ? (
      <div className="absolute top-0 right-0 w-full h-full bg-black-100/70 z-[10000] flex items-center justify-center">
        <Circles
          visible={true}
          height="80"
          width="80"
          color="#3DB46D"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    ): null
  );
};

export default Loader;
