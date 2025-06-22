import axios from "axios";
import { USERID } from "../constants/tgStatic.config";
import { showAllert } from "./showAlert";


export const shareFunction = (id) => async () => {
    const repsonse = await axios.post(`${process.env.REACT_APP_HOST}/bot/getMailingMessage` , {
      "advertisementId" : id,
      "userId" : Number(USERID)
    }, {
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    const messageId = repsonse.data
    window.Telegram.WebApp.shareMessage(messageId).then((result) => {
      }).catch((error) => {
        showAllert("Не удалось поделиться.")
      });

}