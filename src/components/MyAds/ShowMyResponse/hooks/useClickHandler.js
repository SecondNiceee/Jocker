import { useCallback } from "react";
import { useSelector } from "react-redux";
import translation from "../../../../functions/translate";
import { useNavigate } from "react-router";
import $api from "../../../../http";


const bigText = translation("Отправили запрос заказчику, статус задания обновится после после подтверждения")
const useClickHandler = ({advertisement, response}) => {
   const address = useSelector( state => state.telegramUserInfo.address )
   const navigate = useNavigate();
  const clickHandler = useCallback(async () => {
    if (advertisement && response){
    if (address) {
      try {
        await $api.get(`${process.env.REACT_APP_HOST}/bot/notification`, {
          params: {
            executorId: String(response.user.id),
            consumerId: String(response.advertisement.user.id),
            responseId: String(response.id),
            chatId: String(response.advertisement.user.id),
            advertisementId: String(response.advertisement.id),
          },
        });

        window.Telegram.WebApp.showPopup(
          {
            title: translation("Успешно!"),
            message: bigText,
            buttons: [
              { id: "save", type: "default", text: translation("Закрыть") },
            ],
          },
          (buttonId) => {
            if (buttonId === "save" || buttonId === null) {
            }
          }
        );
      } catch (e) {
        window.Telegram.WebApp.showAlert(
          translation(
            "Извините, подверждение не удалось отправить заказчику. Обратитесь в поддержку."
          )
        );
        window.Telegram.WebApp.showAlert(JSON.stringify(e));
        console.warn(e);
      }
    } else {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Кошелек"),
          message:
            translation(`Вы не можете завершить задание, пока у вас не создан кошелек
Кошелёк необходим для выплаты вознаграждения за задание.`),
          buttons: [
            { id: "save", type: "default", text: translation("Создать") },
            { id: "delete", type: "destructive", text: translation("Отмена") },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            navigate("/Profile");
          }
        }
      );
    }
}
  }, [address, advertisement, response, navigate]);
  return clickHandler;
};

export default useClickHandler;
