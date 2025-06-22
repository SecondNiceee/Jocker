import ChemodanAnimation from "../../../components/UI/ChemodanAnimation/ChemodanAnimation";

const NoCards = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="flex items-center flex-col mx-auto">
                <ChemodanAnimation  animationStyles={{
                    width : "100px",
                    marginLeft : "auto",
                    marginRight : "auto"
                }}/>
                <h2 dangerouslySetInnerHTML={{__html : `Добавьте примеры работ <br>
в свой бейдж исполнителя`}} className="text-white mt-[15px] max-w-[300px] text-center font-sf-pro-display-600 text-[22.342px] leading-[27.705px] tracking-[0.078px]"></h2>
                <p className="mt-[10.33px] mx-auto max-w-[305px] text-center text-white font-sf-pro-display-400 leading-[22.3px] text-[17.667px] tracking-[0.177px]">
                        Ваши кейсы помогают заказчикам оценить уровень профессионализма
и повышают шансы на получение новых заказов.
                </p>
                <p className="text-[#2EA6FF] cursor-pointer text-center mt-[13px] font-sf-pro-display-400 text-[17.667px] leading-[22.3px] tracking-[0.177px]">О примерах работ</p>
            </div>
        </div>
    );
};

export default NoCards;