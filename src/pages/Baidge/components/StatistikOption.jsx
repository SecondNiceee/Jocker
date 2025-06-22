import { memo } from "react";

const StatistikOption = ({ text, title, index, configLength }) => {
  return (
    <div className={`flex cursor-pointer flex-col pt-[14px] `}>
      <div className="flex items-center justify-center">
        <p className="font-sf-pro-display-400 ml-[19px] tracking-[.015em] leading-[18.31px]  text-[17px] text-white">
          {title}
        </p>
        <p className="font-sf-pro-display-400 text-[17px] mr-[19px] ml-auto leading-[18.31px] text-[#DAF5FE]">
          {text}
        </p>
      </div>
      <div
        className={`${
          index !== configLength - 1 ? "opacity-1" : "opacity-0"
        } w-[calc(100%-19px)] mt-[14px] h-[0.5px] ml-auto bg-[#384656]`}
      ></div>
    </div>
  );
};

export default memo(StatistikOption);
