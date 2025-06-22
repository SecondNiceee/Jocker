import MainButton from "../constants/MainButton";

export function disableColorButton(){
    MainButton.setParams({
        color: "#2f2f2f",
        text_color: "#606060",
      });
}