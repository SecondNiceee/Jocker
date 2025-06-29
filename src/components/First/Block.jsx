import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";

import Photos from "./FirstMain/Photos";
import MyAdsTop from "./FirstMain/MyAdsTop";
import FirstMainTop from "./FirstMain/FirstMainTop";
import FirstMainMiddle from "./FirstMain/FirstMainMiddle";
import MainBottom from "./FirstMain/MainBottom";
import AdvertisementFeatures from "./AdvertisementFeatures/AdvertisementFeatures";
import { getFeatureConfig } from "./AdvertisementFeatures/AdvertisementFeatures.config";

const Block = ({
  className,
  end = false,
  isButton,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  task,
  agree = false,
  whichOne,
  showStatus = false,
  setPhotoIndex,
  setPhotos,
  setSliderOpened,
  isFirst,
  setDetailsActive
}) => {
  const dispatch = useDispatch();

  const timing = useMemo(() => {
    if (!end) {
      return task.time;
    } else {
      if (whichOne === "startOnly") {
        return { end: task.singleTime };
      } else {
        return { end: task.endTime };
      }
    }
  }, [end, task.endTime, task.singleTime, task.time, whichOne]);

  const isFirstDetailsPhotos = (!isMyAds && !isResponce && !isButton) || isFirst // Фотки принадлежат подробнее в первом  первой страничке

  const features = getFeatureConfig({isOutSide : task.isOutSide, isUrgently : task.isUrgently, isWarranty : task.isWarranty});

  return (
    <>
        <div
          className={
            className ? ["First__block", className].join(" ") : "First__block"
          }
        >
          <Photos
            end = {end}
            isResponse = {isResponce}
            isFirstDetailsPhotos = {isFirstDetailsPhotos}
            setPhotoIndex={setPhotoIndex}
            setPhotos={setPhotos}
            setSliderOpened={setSliderOpened}
            photos={task.photos}
          />

          <AdvertisementFeatures features={features} />

          <MyAdsTop
    
            showStatus={showStatus}
            status={task.status}
            isMyAds={isMyAds}
            isResponce={isResponce}
            viewsNumber={task.viewsNumber}
            responseCounter={task.responseCounter}
          />

          <FirstMainTop
            className={`FirstMain__top ${features.length > 0 ? "!mt-[13.33px]" : "!mt-[15.33px] "}`}
            isMyAds={isMyAds}
            category={task.category}
            isWatched={isWatched}
            taskName={task.taskName}
            id={task.id}
            end={end}
          />

          <FirstMainMiddle time={timing} />

          <MainBottom
            {...{
              tonValue  : task.tonValue,
              isMyAds,
              myAdsFunc,
              isButton,
              end,
              id : task.id,
              agree,
              task,
              isResponce,
              index,
              dispatch,
              deleteFunction,
              setDetailsActive
            }}
          />
        </div>
      
    </>
  );
};

export default memo(Block);
