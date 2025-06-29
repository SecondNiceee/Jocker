import { showAllert } from "../../../functions/showAlert";
import translation from "../../../functions/translate";

const defaultDate = new Date(0)
export default function checkMistakes(changingTask, isSet = true) {
  let taskName = false;
  let timeError = false;
  let descriptionError = false;
  if (changingTask.taskName.length < 3) {
    taskName = true;
    showAllert("Название задания слишком короткое");
    return false;
  }
  if (changingTask.time.end.getTime() !== defaultDate.getTime()) {
    if (changingTask.time.end < changingTask.time.start) {
      timeError = true;
      if (isSet) {
        window.Telegram.WebApp.showAlert(
          translation("У вас дата начала меньше даты завершения.")
        );
        return false;
      }
    }
  }
  if (changingTask.taskDescription.length > 500) {
    descriptionError = true;
    if (isSet) {
      window.Telegram.WebApp.showAlert("Описание больше 500 символов");
      return false;
    }
  }
  let rezult = {
    taskName: taskName,
    timeError: timeError,
    descriptionError: descriptionError,
  };

  return Object.values(rezult).every((value) => value === false);
}
