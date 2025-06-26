import {isEqual} from "lodash";
import { showAllert } from "../../../functions/showAlert";
export class BackButtonController{
    async backFunction({errors, changedCard, isNewCard, card, save, navigate}){
        const isCloseSrazy = !isNewCard ? isEqual(changedCard, {...card, links : card?.links ?? ['']}) : 
        isEqual(changedCard, {
            id : null,
            title : "",
            description : "",
            photos : [],
            photosNames : [],
            links : []
        })
        if (isCloseSrazy){
            window.history.back();
        }
        else{
            window.Telegram.WebApp.showPopup(
                {
                  title: "Сохранить?",
                  message: "Сохранить кейс перед выходом?",
                  buttons: [
                    { id: "save", type: "default", text: "Сохранить" },
                    { id: "delete", type: "destructive", text: "Нет" },
                  ],
                },
                async (buttonId) => {
                  if (buttonId === "save") {
                    if (Object.values({...errors, links : errors.links.isError}).every( (err) => !err ) ){
                        try{
                            save()
                        }
                        catch(e){
                            showAllert("Ошибка сохранения кейса. Проверьте введенные данные, возможно они не валидны или слишком велики/слишком малы. (Много ссылок, много фоток)")
                        }
                    }
                    else{
                        if (errors.title){
                            showAllert("Некорректная длина заголовка (3–25 символов)")
                        }
                        else{
                            if (errors.description){
                                showAllert("Слишком короткое описание (от 5 до 500 символов)")
                            }
                            else{
                                if (errors.photos){
                                    showAllert("Добавьте примеры работ (максимум 5)")
                                }
                                else{
                                    showAllert('Недействительные ссылки (проверьте URL)')
                                }
                            }
                        }
                    }
                  }
                  if (buttonId === "delete" || buttonId === null) {
                    navigate(-1);
                  }
                }
              );
        }
    }
}

export const backButtonController = new BackButtonController();