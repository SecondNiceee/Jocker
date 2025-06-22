import BackButton from "../../../constants/BackButton";
import pagesHistory from "../../../constants/pagesHistory";

class BackButtonController {
  backButtonFunction({
    isStatistikOpened,
    isCardPageOpened,
    isPortfolioOpened,
    navigate,
    setPortfoliosOpened,
    setCardPageOpen,
    isSliderOpened,
    isChangingCardOpened,
    setBaidgeClose
  }) {
    if (isChangingCardOpened){
      return;
    }
    if (isSliderOpened){
      return;
    }
    if (!isStatistikOpened) {
      if (!isCardPageOpened) {
        if (!isPortfolioOpened) {
          if (setBaidgeClose){
            setBaidgeClose(true);
          }
          else{
            if (pagesHistory.length > 0) {
              navigate(-1);
            }
            navigate("/");
          }
        } else {
          setPortfoliosOpened(false);
        }
      } else {
        setCardPageOpen(false);
      }
    }
  }

  controllVisability(){
    BackButton.show();
  }
}
const backButtonController = new BackButtonController();
export default backButtonController;
