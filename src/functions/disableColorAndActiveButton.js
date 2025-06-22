import MainButton from "../constants/MainButton";

export function disableColorAndActiveButton(){
    MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
}