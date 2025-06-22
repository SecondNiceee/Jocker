import { memo, useCallback, useEffect, useState } from "react";
import TaskDetailsContainer from "./TaskDetailsContainer";
import TimeAndWatches from "./TimeAndWatches";
import { useDispatch, useSelector } from "react-redux";
import { addWatch, setDetailsAdvertisement } from "../../../store/information";
import MyLoader from "../../UI/MyLoader/MyLoader";
import {  useNavigate, useParams } from "react-router";
import menuController from "../../../functions/menuController";
import MainButton from "../../../constants/MainButton";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";
import useNavigateBack from "../../../hooks/useNavigateBack";
import { getAdvertisementById } from "../../../functions/api/getAdvertisemetById";
import useIsMyResponse from "../../../pages/First/hooks/useIsMyResponse";
import { showAllert } from "../../../functions/showAlert";
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton";
import { disableColorButton } from "../../../functions/disableColorButton";
import { useAddPageHistory } from "../../../hooks/useAddPageHistory";

const advertisementId =  window.Telegram.WebApp.initDataUnsafe.start_param?.split('m')[0] || null
const FirstDetails = ({ end, sliderClassName, className,navigateBack = true, hideMenu, showButton=true, orderInformationParam = null, ...props }) => {

  const disatch = useDispatch();

  const { id } = useParams();

  useAddPageHistory();

  const externalOrderInformation = useSelector( (state) => state.information.detailsAdvertisement );

  const [orderInformation, setOrderInformation] = useState(null);

  useEffect( () => {
    if (orderInformationParam){
      setOrderInformation(orderInformationParam);
    }
    else{
      setOrderInformation(externalOrderInformation);
    }
  }, [orderInformationParam, setOrderInformation, externalOrderInformation] )


    const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();


  useEffect( () => {
    if (!orderInformation && showButton && !orderInformationParam){
      if (advertisementId && !id){
        getAdvertisementById(Number(advertisementId))
          .then((advertisement) => {
            disatch(setDetailsAdvertisement(advertisement));
          })
          .catch((err) => {
            console.warn(err);
          });
      }
      else{
          getAdvertisementById(id)
          .then((advertisement) => {
            disatch(setDetailsAdvertisement(advertisement));
          })
          .catch((err) => {
            console.warn(err);
          });
      }
    }
  }, [ id, orderInformation, disatch, showButton, orderInformationParam ] )

  const navigate = useNavigate();

  useEffect(() => {
    if (isSliderOpened){
      MainButton.setText("Закрыть");
    }
    else{
      if (showButton){
        menuController.lowerMenu();
        MainButton.show();
        MainButton.setText("ОТКЛИКНУТЬСЯ");
      }
    }
  }, [showButton, isSliderOpened]);
  
  const {isMyResponse, isMyTask} = useIsMyResponse({detailsAdertisement : orderInformation});

  useEffect( () => {
    if ((isMyResponse || isMyTask) && !isSliderOpened && showButton){
      disableColorButton();
    }
    return () => {
      enableColorAndActiveButton();
    }
  }, [isMyResponse, isSliderOpened, isMyTask, showButton] )

  const goForward = useCallback( () => {
    if (isSliderOpened){
      setSlideOpened(false)
      return ;
    }
    if (isMyResponse){
      showAllert("Вы уже откликнулись на это задание.")
    }
    else{
      if (isMyTask){
        showAllert("Вы не можете откликаться на свои задания")
      }
      else{
        if (advertisementId){
          navigate(`/makeresponse/${advertisementId}`)
        }
        else{
          if (id){
            navigate(`/makeresponse/${id}`)
          }
          else{
            alert("Не удалось откликнуться, возможно задание не активно или удалено")
          }
        }
  
      }
    }
  }, [id, navigate, isMyResponse, isMyTask, isSliderOpened, setSlideOpened] )

  useEffect( () => {
    if (showButton){
      menuController.hideMenu();
    }
  }, [showButton] )

  useEffect( () => {
    if (showButton){
      MainButton.onClick(goForward);
    }
    return () => {
      MainButton.offClick(goForward)
    }
  }, [goForward, showButton] )


  useNavigateBack({isSliderOpened, setSlideOpened, isWorks : navigateBack});

  useEffect(() => {
    if (!end && orderInformation) {
      disatch(addWatch(orderInformation));
    }
  }, [disatch, end, orderInformation]);

  if (!orderInformation) {
    return <MyLoader />;
  }
  return (
    <>
      <div
        {...props}
        className={
          className
            ? ["TaskDetails ", className].join(" ")
            : "TaskDetails"
        }
      >
        <div onClick={goForward} className="fixed left-1/2 z-50 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer">
          MAIN BUTTON
        </div>
        <TaskDetailsContainer
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSliderOpened={setSlideOpened}
          end={end}
          orderInformation={orderInformation}
        />
        {end ? (
          <></>
        ) : (
          <TimeAndWatches
            responses={
              orderInformation.responces
                ? orderInformation.responces.length
                : null
            }
            time={orderInformation.creationTime}
            watches={orderInformation.viewsNumber}
          />
        )}
      </div>
      <CssTransitionSlider
        className={sliderClassName}
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

export default memo(FirstDetails);
