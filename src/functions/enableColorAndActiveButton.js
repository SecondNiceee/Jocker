import MainButton from "../constants/MainButton";

export function enableColorAndActiveButton(){
    MainButton.setParams({
        is_active: true,
        color: "#2ea5ff",
        text_color: "#ffffff",
      });
}