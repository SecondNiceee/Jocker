import React, { memo } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import { addWatch } from "../../../store/watchedAds";

const QThree = ({isMyAds , isResponce, isButton, setDetailsActive, index, dispatch, id }) => {
    
  return (
    <>
      {!isMyAds && !isResponce ? (
        <MyButton
        hard = {true}
          style={isButton ? {} : { display: "none" }}
          onClick={(e) => {
            setDetailsActive({ isOpen: true, id: index });
            dispatch(addWatch(id));
          }}
        >
          Подробнее
        </MyButton>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(QThree);
