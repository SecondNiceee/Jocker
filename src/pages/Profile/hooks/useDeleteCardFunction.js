import { useDispatch } from 'react-redux';
import { deleteCard, deleteServerCard } from '../../../store/telegramUserInfo';
import translation from '../../../functions/translate';


const Yes = translation("Да");
const No = translation("Нет");

const useDeleteCardFunction = () => {

    const dispatch = useDispatch();

    const deleteFunction = (index, e) => {  // index порядок с нуля карточки, e - сам объекти карточки
        window.Telegram.WebApp.showPopup(
          {
            title: translation("Удалить?"),
            message: translation("Вы хотите удалить этот кейс?"),
            buttons: [
              { id: "save", type: "default", text: Yes },
              { id: "delete", type: "destructive", text: No },
            ],
          },
          (buttonId) => {
            if (buttonId === "delete" || buttonId === null) {
            }
            if (buttonId === "save") {
              dispatch(deleteServerCard(e.id));
              dispatch(deleteCard(index));
            }
          }
        );
      }

    return deleteFunction
    
};

export default useDeleteCardFunction;