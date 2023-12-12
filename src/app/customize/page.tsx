"use client";
import AfterResponse from "@/Component/AfterResponse";
import TakeResponse from "@/Component/TakeResponse";
import React from "react";

const Customise = () => {
  const [preserveData,setPreserveData]=React.useState()
  return (
    <div>
      <a href="/" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-dark">
          Home
        </span>
      </a>
      {preserveData? <AfterResponse />:<TakeResponse setPreserveData={setPreserveData}/>}
    </div>
  );
};

export default Customise;
