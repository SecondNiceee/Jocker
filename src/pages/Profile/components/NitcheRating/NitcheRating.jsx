import { useMemo } from "react";

const NitcheRating = ({nitcheRating, onClick}) => {
    const color = useMemo( () => {
        switch (nitcheRating){
            case(1):return {
                title : "text-[#FFDC2E]",
                text : "text-[#FEFFBB]"
            }
            case(2):return {
                title : "text-[#D3D3D3]",
                text : "text-[#F7F7F7]"
            }
            case(3):return {
                title : "text-[#FB9959]",
                text : "text-[#FCC29C]"
            }
            default : return {
                title : "text-[#FFC6A3]",
                text : "text-[#FFF5EF]"
            }
        }
    } , [nitcheRating])
    return (
        <div onClick={onClick} className={`flex cursor-pointer ml-[23px] mt-[23px] flex-col gap-[5px] my-auto`}>
        <h2 className={`font-sf-pro-display-600 text-[17px] ${color.title} leading-[18px]`}>
          #{nitcheRating}
        </h2>
        <p className={`font-sf-pro-display max-w-[80px] leading-[14.667px]  ${color.text} text-[13px] tracking-wide`}>
          в рейтинге по нише
        </p>
      </div>
    );
};

export default NitcheRating;