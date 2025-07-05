import MainButton from "../../../constants/MainButton"
import { disableColorAndActiveButton } from "../../../functions/disableColorAndActiveButton"
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton"
import { successVibration } from "../../../functions/successVibration";

class BaidgeButtonController{
    mainButton = MainButton;
    controlVisability({errors, step}){
        const isNeededToEnableFirstPage = !errors.descriptionError
        const isNeededToEnableSecondPage = Object.values({taggsError : errors.taggsError, linksError : errors.linksError}).every((val) => !val)
        if (step === 0){
            if (isNeededToEnableFirstPage){
                enableColorAndActiveButton()
            }
            else{
                disableColorAndActiveButton();
            }
        }
        else{
            if (isNeededToEnableSecondPage){
                enableColorAndActiveButton()
            }
            else{
                disableColorAndActiveButton();
            }
        }
    }

    forwardFunction({step, setStep, postBaidge}){
            console.log(step);
            if (step === 1){
                successVibration();
                postBaidge()
            }
            else{
                console.log("asd")
                
                setStep(1)
            }
    }
    backFunction({step, navigate, setStep}){
            if (step === 1){
                setStep(0)
            }
            else{
                navigate(-1);
            }  
    }
    controlText({step, me, isChanging}){
        if (step === 0){
            this.mainButton.setText("ДАЛЕЕ")
        }
        else{
            if (isChanging){
                this.mainButton.setText("Изменить бэйдж")
            }
            else{
                this.mainButton.setText("Создать бэйдж")
            }
        }
    }
}

export const baidgeButtonController =  new BaidgeButtonController();