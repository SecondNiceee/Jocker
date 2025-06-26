import axios from "axios";
import translation from "../translate";
import en from "../../constants/language";
import { USERID } from "../../constants/tgStatic.config";
const messageOne = translation("📣 Вы получили отклик на задачу «");
const messageTwo = translation("» от ");
export const createResponse = async ({responce, responseAdvertisement, responseUser}) => {
    let myFormData = new FormData();
    myFormData.append("information", String(responce.text));
    myFormData.append("userId", String(USERID));
    myFormData.append("advertismentId", String(responseAdvertisement.id));
    responce.photos.forEach((e, i) => {
      myFormData.append(`photos`, e);
    });
    try {
      let im;
      for (let i = 0; i < 1; i++) {
        im = await axios.post(
          process.env.REACT_APP_HOST + "/response",
          myFormData,
          {
            params: {
              advertisementId: String(responseAdvertisement.id),
              userId: String(responseUser.id),
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          }
        );
      }
      try {
        await axios.get(process.env.REACT_APP_HOST + "/user/sendMessage", {
          params: {
            chatId: String(responseAdvertisement.user.id),
            text:
              messageOne +
              responseAdvertisement.taskName.bold() +
              messageTwo +
              responseUser.fl,
            buttonUrl:
              "https://connectbirga.ru/ResponsePage?advertisement=" +
              String(responseAdvertisement.id) +
              "&response=" +
              String(im.data.id),
            languageCode: en ? "en" : "ru",
          },
          headers: {
            "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
          },
        });
      } catch (e) {
        console.warn(e);
      }
      return im.data;
    } catch (e) {
      console.log(e);
      window.Telegram.WebApp.showAlert(e);
    }

}