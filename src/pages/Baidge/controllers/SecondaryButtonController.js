import { SecondatyButton } from "../../../constants/SecondaryButton";
import { deleteServerCard } from "../../../store/telegramUserInfo/thunks/deleteServerCard";

class SecondaryButtonController{
    secondaryButton = SecondatyButton;
    controllVisabiliry({isSliderOpened, isChangingCardOpened}){
        if (isSliderOpened){
            this.secondaryButton.hide();
            return;
        }
        SecondatyButton.show()
        SecondatyButton.setText("Удалить")
        SecondatyButton.setParams({
            position : "left",
            color : "#462424",
            text_color : "#FF4646"
        })
    }

    secondaryButtonHandler({dispatch, card ,navigate, me}){
        window.Telegram.WebApp.showPopup({
                  title: "Удалить?",
                  message: "Вы уверены, что хотите удалить этот кейс?",
                  buttons: [
                    { id: "save", type: "default", text: "Да" },
                    { id: "delete", type: "destructive", text: "Нет" },
                  ],
                } , async (buttonId) => {
            
                  if (buttonId === "delete" || buttonId === null) {
                    
                  } 
                  if (buttonId === "save") {
                    await dispatch(deleteServerCard(card.id))
                    navigate(-1);
                  }
                } )
        
    }
}

export const secondaryButtonController = new SecondaryButtonController();