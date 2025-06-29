import { memo } from "react";
import TaskDetailsContainer from "./TaskDetailsContainer";
import MyLoader from "../../UI/MyLoader/MyLoader";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";

const TaskCreatingDetails = ({ orderInformation, className, ...props }) => {
  // Всегда только просмотр, без кнопок, без меню, без состояния
  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();


  if (!orderInformation) {
    return <MyLoader />;
  }
  return (
    <>
      <div
        {...props}
        className={className ? ["TaskDetails ", className].join(" ") : "TaskDetails"}
      >
        <TaskDetailsContainer
          isActive={false}
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSliderOpened={setSlideOpened}
          end={true}
          orderInformation={orderInformation}
        />
        {/* end=true, поэтому TimeAndWatches не показываем */}
      </div>
      <CssTransitionSlider
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
    </>
  );
};

export default memo(TaskCreatingDetails);
