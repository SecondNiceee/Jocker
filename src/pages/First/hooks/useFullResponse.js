import { useCallback } from "react";
import translation from "../../../functions/translate";
import usePostResponse from "./usePostResponse";

let resp = translation("Откликнуться?");
const textButton = translation("Вы действительно хотите откликнуться?");

const Yes = translation("Да");
const No = translation("Нет");

const useFullResponse = ({ responce, detailsAdertisement, responseRef, setBaidge, setDetailsActive, setPutStatus, setResponce, setStep  }) => {
  const postResponce = usePostResponse({
    detailsAdertisement,
    responseRef,
    setBaidge,
    setDetailsActive,
    setPutStatus,
    setResponce,
    setStep,
    responce,
  });
  const fullResponse = useCallback(() => {
    if (responce.text.length < 3) {
      window.Telegram.WebApp.showAlert(translation("Ваш отклик пуст!"));
    } else {
      window.Telegram.WebApp.showPopup(
        {
          title: resp,
          message: textButton,
          buttons: [
            { id: "save", type: "default", text: Yes },
            { id: "delete", type: "destructive", text: No },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred(
              "success"
            );
            postResponce(detailsAdertisement.id);
          }
        }
      );
    }
  }, [responce, postResponce, detailsAdertisement]);
  return fullResponse;
};

export default useFullResponse;
