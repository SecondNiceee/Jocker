import  { memo } from "react";
import { openLink } from "../../../functions/openLink";
const GoToMessageButton = ({link, className, isActive}) => {

  const onClick = () => {

    if (!isActive){
          window.Telegram.WebApp
          .showPopup({
            title: "Доступ ограничен",
            message: "Чтобы связаться с пользователем, необходимо сначала откликнуться на его задание",
            buttons: [
              { id: "save", type: "default", text: "Понятно" },
            ],
          } , (buttonId) => {
                      
            if (buttonId === "save" || buttonId === null) {

            };
          } )
    }
    else{
      openLink(`https://t.me/${link}`)
    }
  }
  return (
    <div onClick={onClick} className={`w-full cursor-pointer py-[11px] justify-center items-center gap-1 flex ${isActive ? 'bg-telegram' : 'bg-[#2F2F2F]' } rounded-[11.67px] ${className}`}>
      <p className={`${isActive ? 'text-white' : 'text-[#606060]'} items-center tracking-wide font-sf-pro-display-600  leading-[15.643px]`}>
        Написать сообщение
      </p>
      <img
        className="w-[27px] h-[27px]"
        src= {isActive ? "/images/Baidge/message.svg" : "/images/Baidge/non-active-message.svg"}
        alt=""
      />
    </div>
  );
};

export default memo(GoToMessageButton);
