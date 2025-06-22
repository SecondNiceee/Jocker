import { useCallback } from "react";
import translation from "../../../functions/translate";

const useForward = ({
  isSliderOpened,
  isMyResponse,
  setSlideOpened,
  setStep,
  step,
  isCatetegoryChoiceOpen,
  isSubCategoryChoiceOpen,
  subCategory, 
  categoryOpen,
  responce,
  fullResponse
}) => {
  const forward = useCallback(() => {
    // эта функция вызывается в момент , когда мы находимся в подробнее задания
    if (!isCatetegoryChoiceOpen && !isSubCategoryChoiceOpen) {
      if (!isSliderOpened) {
        if (isMyResponse) {
          window.Telegram.WebApp.showPopup({
            title: translation("Ошибка"),
            message: translation(
              "Задание ваше или вы откликнулись уже на него."
            ),
          });
        } else {
          if (step === 0) {
            setStep(1);
          } else if (step === 1) {
            if (!subCategory && !categoryOpen) {
              if (!isSliderOpened) {
                if (!responce.shablonMaker) {
                  fullResponse();
                }
              } else {
                setSlideOpened(false);
              }
            }
          }
        }
      } else {
        setSlideOpened(false);
      }
    }
  }, [
    isSliderOpened,
    isMyResponse,
    setSlideOpened,
    setStep,
    step,
    isCatetegoryChoiceOpen,
    isSubCategoryChoiceOpen,
    categoryOpen,
    responce.shablonMaker,
    subCategory,
    fullResponse
  ]);

  return forward;
};

export default useForward;
