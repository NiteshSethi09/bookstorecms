"use client";

import NotFoundImg from "@/assets/NotFound.svg";

const NotFound = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center p-8">
        <img src={NotFoundImg} alt="" className="mb-8 w-[800px]" />
        <p>Oops! Looks like to hit a wrong URL. Please check.</p>
      </div>
    </>
  );
};

export default NotFound;
