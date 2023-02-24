import React from "react";
interface IndicatorProps {
  onSale: boolean;
}
const Indicator = ({ onSale }: IndicatorProps) => {
  return (
    <>
      <span
        className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
        ${onSale ? "bg-green-100" : "bg-red-100"} 
        ${onSale ? "text-green-800" : "text-red-800"} 
        dark:${onSale ? "bg-green-900" : "bg-red-900"} 
        dark:${onSale ? "text-green-300" : "text-red-300"}`}
      >
        <span
          className={`mr-1 h-2 w-2 rounded-full 
          ${onSale ? "bg-green-500" : "bg-red-500"}`}
        ></span>
        Sale
      </span>
    </>
  );
};

export default React.memo(Indicator);
