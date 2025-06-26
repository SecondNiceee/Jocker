import { useMemo } from "react";
import Dedline from "./Dedline";
import Customer from "./Customer";
import Block from "../Block";
import Description from "../../UI/Desription/Description";

const TaskDetailsContainer = ({
  orderInformation,
  end = false,
  setPhotoIndex,
  setPhotos,
  setSliderOpened,
  isActive
}) => {
  const dedline = useMemo(() => {
    if (!end) {
      return orderInformation.time;
    } else {
      if (orderInformation.whichOne === "startOnly") {
        return { start: new Date(0), end: orderInformation.singleTime };
      } else {
        return {
          start: orderInformation.startTime,
          end: orderInformation.endTime,
        };
      }
    }
  }, [orderInformation, end]);


  return (
    <div className="Task__container-one">
      <Block
        setPhotoIndex={setPhotoIndex}
        setPhotos={setPhotos}
        setSliderOpened={setSliderOpened}
        end={end}
        task={orderInformation}
        {...orderInformation}
        isButton={false}
      />
      <Description classNames={'mt-3'} nonText={"Подробности задания не указаны"} text={orderInformation.taskDescription}  />
      <Dedline deadline={dedline} />
      {!orderInformation.isOutSide ? 
      <div className="TaskDetails-row">
        <Customer
          isActive={isActive}
          user={orderInformation.user}
        />
      </div>
      :
      <>
      </>
      }

    </div>
  );
};

export default TaskDetailsContainer;
