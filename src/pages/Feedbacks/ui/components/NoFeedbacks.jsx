import { useEffect } from "react";
import MainButton from "../../../../constants/MainButton";
import StonedAnimation from "../../../../components/UI/StonedAnimation/StonedAnimation";


const NoFeedbacks = () => {
    useEffect( () => {
        MainButton.show();
        MainButton.setText("Добавить отзыв");
    } , [])
    return (
        <div className="connect-container h-screen justify-center items-center">
            <div className="flex items-center flex-col mx-auto">
                <StonedAnimation  animationStyles={{
                    width : "100px",
                    marginLeft : "auto",
                    marginRight : "auto"
                }}/>
                <h2 className="text-white mt-[15px] max-w-[260px] text-center font-sf-pro-display-600 text-[22.342px] leading-[27.705px] tracking-[0.078px]">Пока нет отзывов</h2>
                <p className="mt-[10.33px] mx-auto max-w-[270px] text-center text-white font-sf-pro-display-400 leading-[22.3px] text-[17.667px] tracking-[0.177px]">
                        Этот профиль пока не содержит отзывов — вы можете оставить его одним из первых!
                </p>
                <p className="text-[#2EA6FF] cursor-pointer text-center mt-[13px] font-sf-pro-display-400 text-[17.667px] leading-[22.3px] tracking-[0.177px]">Узнайте как</p>
            </div>
        </div>
    );
};

export default NoFeedbacks;