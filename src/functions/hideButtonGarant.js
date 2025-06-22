import MainButton from "../constants/MainButton";

export const hideMainButtonGarant = async () =>{
    await new Promise((res, rej) => setTimeout(() => res, 100));
    MainButton.hide();
}