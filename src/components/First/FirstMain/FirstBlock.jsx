import { memo } from "react";
import Block from "../Block";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setDetailsAdvertisement } from "../../../store/information";
import { addWatch } from "../../../store/watchedAds";

const FirstBlock = ({
  className,
  end = false,
  category,
  isButton,
  photos,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  id,
  setSlideActive,
  tonValue,
  task,
  agree = false,
  setPhotoIndex,
  setPhotos,
  isFirst,
}) => {
  const props = {
    className: className,
    end: end,
    isButton: isButton,
    isMyAds: isMyAds,
    deleteFunction: deleteFunction,
    myAdsFunc: myAdsFunc,
    isResponce: isResponce,
    isWatched: isWatched,
    index: index,
    setSlideActive: setSlideActive,
    task: task,
    agree: agree,
    isFirst: isFirst,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setDetailsActive = () => {
    navigate(`/FirstDetails/${task.id}`);
    dispatch(setDetailsAdvertisement(task));
    dispatch(addWatch(task.id));
  };

  return (
    <Block
      setDetailsActive={setDetailsActive}
      setSliderOpened={setSlideActive}
      setPhotos={setPhotos}
      setPhotoIndex={setPhotoIndex}
      {...props}
      photos={photos}
    />
  );
};

export default memo(FirstBlock);
