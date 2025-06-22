import MainButton from "../../../constants/MainButton";
import { disableColorAndActiveButton } from "../../../functions/disableColorAndActiveButton";
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton";
import { showAllert } from "../../../functions/showAlert";
import {isEqual} from "lodash";

class MainButtonController{
    mainButton = MainButton
    async forwardFunction({errors, save}){
        console.log("Го")
        if (errors.links.isError){
            showAllert("Ваши некоторые ссылки невалидны")
        }
        else{
            try {
                console.log("Ухожу в save")
                save()
                } catch (error) {
                console.error('Ошибка при сохранении карточки:', error);
                showAllert("Ошибка сохранения кейса. Проверьте введенные данные, возможно они не валидны или слишком велики/слишком малы. (Много ссылок, много фоток)")
                }
        }
    }

    visabilityController({errors, card, changedCard}){
            if (!(Object.values({...errors, links : false }).every( (el) => !el)) || isEqual(card, changedCard)){
                disableColorAndActiveButton();
            }
            else{
                enableColorAndActiveButton();
            }
    }

}

export const mainButtonController = new MainButtonController();