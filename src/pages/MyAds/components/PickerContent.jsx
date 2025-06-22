import { memo } from "react";

import PickerTwo from "./PickerTwo";
import PickerOne from "./PickerOne";



const PickerContent = ({
  nowValue,
  valueTwo,
  valueOne,
  responsesArr,
  myAdsArray,
}) => {

  return (
    <>
      <div
        className="PickerContent"
        style={
          nowValue === "customer"
            ? { transform: "translateX(-50%)" }
            : { transform: "translateX(0%)" }
        }
      >
        
        <PickerOne oneValue = {valueOne}   responsesArr = {responsesArr}  />

        <PickerTwo valueTwo = {valueTwo} myAdsArray={myAdsArray}   />

      </div>

      
    </>
  );
};

export default memo(PickerContent);
