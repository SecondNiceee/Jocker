import { useLottie } from "lottie-react";
import { memo } from "react";
import chemodanAnimation from "../../../animation/Chemodan.json";

const ChemodanAnimation = ({
  text = "Вы не откликнулись ни на одно задание",
  animationStyles = {},
  animationSrc,
  ...props
}) => {
  const options = {
    animationData: chemodanAnimation, // Убедись, что stonedAnimation импортирован
    style: animationStyles,
  };

  const { View, play } = useLottie(options); // Получаем play

  return (
    <div
      {...props}
      onClick={() => {
        play(); // Перезапускаем анимацию
      }}
      style={{ cursor: "pointer", ...animationStyles }} // Добавил стили для наглядности
    >
      {View}
    </div>
  );
};

export default memo(ChemodanAnimation);