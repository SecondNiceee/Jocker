import StarAnimation from "../../../../components/UI/StarAnimation/StarAnimation";

const NoFeedbacksForMe = () => {
    return (
        <div className="connect-container h-screen justify-center items-center">
            <div className="flex flex-col items-center mx-auto">
                <StarAnimation  animationStyles={{
                    width : "100px",
                    marginLeft : "auto",
                    marginRight : "auto"
                }}/>
                <h2 className="text-white max-w-[260px] mt-[15px] text-center font-sf-pro-display-600 text-[22.342px] leading-[27.705px] tracking-[0.078px]">Добавьте отзывы в персональный бейдж</h2>
                <p className="mt-[10.33px] mx-auto max-w-[300px] text-center text-white font-sf-pro-display-400 leading-[22.3px] text-[17.667px] tracking-[0.177px]">
                    Отзывы заказчиков повышают доверие к вашему профилю и влияют на место в рейтингах Connect. 
                </p>
                <p className="text-[#2EA6FF] cursor-pointer text-center mt-[13px] font-sf-pro-display-400 text-[17.667px] leading-[22.3px] tracking-[0.177px]">Об отзывах</p>
            </div>
        </div>
    );
};

export default NoFeedbacksForMe;