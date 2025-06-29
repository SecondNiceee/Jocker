import { USERID } from "../constants/tgStatic.config";
import { showAllert } from "./showAlert";
import $api from "../http";

export const shareFunction = (id) => async () => {
    const repsonse = await $api.post(`${process.env.REACT_APP_HOST}/bot/getMailingMessage` , {
      "advertisementId" : id,
      "userId" : Number(USERID)
    }, {
    })
    const messageId = repsonse.data
    window.Telegram.WebApp.shareMessage(messageId).then((result) => {
      }).catch((error) => {
        showAllert("Не удалось поделиться.")
      });

}