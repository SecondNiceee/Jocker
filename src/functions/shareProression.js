import { showAllert } from "./showAlert";
import { USERID } from "../constants/tgStatic.config";
import $api from "../http";

export const shareProfession = (userId, professionName) => async () => {
    const repsonse = await $api.post(`${process.env.REACT_APP_HOST}/bot/sendProfessionMessage` , {
      "language_code" : "ru",
      "authorId" : Number(USERID),
      "professionName" : professionName,
      "ownerId" :  Number(userId)
    })
    const messageId = repsonse.data
    console.warn(messageId);
    window.Telegram.WebApp.shareMessage(messageId).then((result) => {
      }).catch((error) => {
        showAllert("Не удалось поделиться.")
      });

}