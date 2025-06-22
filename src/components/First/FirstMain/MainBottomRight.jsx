import  { memo } from "react";
import QOne from "./QOne";
import QTwo from "./QTwo";
import QThree from "./QThree";
import QFour from "./QFour";

const MainBottomRight = ({
  isMyAds,
  myAdsFunc,
  isButton,
  end,
  id,
  agree,
  task,
  isResponce,
  setDetailsActive,
  index,
  dispatch,
  deleteFunction
}) => {

  return (
    <div className="FirstMain__bottom-right">
      <QOne isMyAds={isMyAds} myAdsFunc={myAdsFunc} isButton={isButton} />

      <QTwo
        end={end}
        agree={agree}
        id={id}
        task={task}
        isButton={isButton}
        isResponce={isResponce}
        isMyAds={isMyAds}
      />

      <QThree
        setDetailsActive = {setDetailsActive}
        isMyAds={isMyAds}
        isButton={isButton}
        isResponce={isResponce}
        index={index}
        dispatch={dispatch}
        id={id}
      />

      <QFour id = {id} isResponce={isResponce} deleteFunction={deleteFunction} isButton={isButton} setDetailsActive={setDetailsActive} />
    </div>
  );
};

export default memo(MainBottomRight);
