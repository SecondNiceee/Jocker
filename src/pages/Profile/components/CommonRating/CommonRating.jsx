import { useMemo } from "react";

const CommonRating = ({commonRating, onClick = () => {}}) => {
    const color = useMemo( () => {
        switch (commonRating){
            case(1):return {
                title : "text-[#B0DDFF]",
                text : "text-[#C2E4F8]"
            }
            case(2):return {
                title : "text-[#A4F0E1]",
                text : "text-[#C5F7ED]"
            }
            case(3):return {
                title : "text-[#FB9959]",
                text : "text-[#FCC29C]"
            }
            default : return {
                title : "text-[#4DB2FF]",
                text : "text-[#ACDCFF]"
            }
        }
    } , [commonRating])

    return (
        <div onClick={onClick} className="flex cursor-pointer ml-[23px] mt-[23px] flex-col gap-[5px] my-auto">
        <h2 className={`font-sf-pro-display-600 text-[17px] ${color.title}  leading-[18px]`}>
          Топ {commonRating}
        </h2>
        <p className={`font-sf-pro-display max-w-[80px] text-[13px] tracking-wide ${color.text} leading-[14.667px]`}>
          в рейтинге Connect
        </p>
      </div>
    );
};

export default CommonRating;