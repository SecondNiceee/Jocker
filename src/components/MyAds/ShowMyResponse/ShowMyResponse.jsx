import { memo, useEffect } from "react";
import cl from "./ShowMyResponse.module.css";
import ResponseBlock from "../ResponseBlock";
import MyReaction from "../MyReaction";
import Customer from "../Customer/Customer";
import formatDate from "../../../functions/makeDate";
import MyLoader from "../../UI/MyLoader/MyLoader";
import MainButton from "../../../constants/MainButton";
import Text from "../../Text/Text";
import translation from "../../../functions/translate";
import {  useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getResponseById from "../../../functions/api/getResponseById";
import { setAdvertisement, setResponse } from "../../../store/information";
import { getAdvertisementById } from "../../../functions/api/getAdvertisemetById";
import useSlider from "../../../hooks/useSlider";
import useClickHandler from "./hooks/useClickHandler";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";
import menuController from "../../../functions/menuController";
import useNavigateBack from "../../../hooks/useNavigateBack";

const textButtonOne = translation("ВЫПОЛНИЛ")
const isTake = translation("Вы выполнили это задание?")

const Yes = translation("Да")
const No = translation("Нет")
const ShowMyResponse = () => {

  const address = useSelector( state => state.telegramUserInfo.address )
  const navigate = useNavigate()

  const {resId, advId} = useParams();

  const dispatch = useDispatch();

  const response = useSelector(state => state.information.response);
  const advertisement = useSelector( state => state.information.advertisement );

  const clickHandler = useClickHandler({advertisement, response})

  useEffect( () => {
    if (!response || !advertisement){
       getResponseById(resId).then( (res) =>  {
        dispatch(setResponse(res))
       }  )
       getAdvertisementById(advId).then( (adv) => {
        dispatch(setAdvertisement(adv))
       } )
    }
  }, [response, advertisement,resId, advId, dispatch] )

  useEffect(() => {
    
    function click() {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Подтвердите"),
          message: isTake,
          buttons: [
            { id: "save", type: "default", text: Yes },
            { id: "delete", type: "destructive", text: No },
          ],
        },
        (buttonId) => {
          if (buttonId === "save") {
            clickHandler();
          }
          if (buttonId === "delete" || buttonId === null) {

          }
        }
      );
    }

    if (response?.isWatched === "inProcess") {
      menuController.lowerMenu();
      MainButton.show();
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      MainButton.setText(textButtonOne);
      MainButton.onClick(click);
    }
    return () => {
      menuController.raiseMenu(); 
      MainButton.hide();
      MainButton.offClick(click);
    };
  }, [
    advertisement,
    response,
    address,
    clickHandler
  ]);

  const openDetails = () => {
    navigate(`/responsedAdvertisement/${advertisement.id}`)
  }

  const openAboutReaction = () => {
    
  }

  const setLastAds = () => {
    
  }

  const deleteFunction = () => {

  }
  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  const openCusotomerProfile = () => {
      navigate(`/Baidge/${advertisement.user.id}`)
  }

  useNavigateBack({isSliderOpened,setSlideOpened})
  return (
    <>
      {(!response || !advertisement) ? (
        <div className={cl.wrapper}>
          <MyLoader style={{ width: "100vw", height: "calc(100vh)" }} />
        </div>
      ) : (
        <div style={MainButton.isVisible ? {paddingBottom : "74px"} : {paddingBottom : "97px"}} className={cl.wrapper}>
          <ResponseBlock
            isForSliderOpened={true}
            isWatched={response.isWatched}
            func={openDetails}
            className={cl.response}
            buttonText={"Подробнее"}
            {...advertisement}
            task={advertisement}
            setPhotoIndex={setPhotoIndex}
            setPhotos={setPhotos}
            setSlideActive={setSlideOpened}

          />
          <MyReaction
            setPhotoIndex={setPhotoIndex}
            setPhotos={setPhotos}
            setSlideOpened={setSlideOpened}
            openAboutReactionFunc={openAboutReaction}
            setLastAds={setLastAds}
            deleteFunction={deleteFunction}
            responce={response}     
          />
          <Customer
            onImageClick={openCusotomerProfile}
            id = {advertisement.user.id}
            fl={advertisement.user.fl}
            photo={advertisement.user.photo}
            link={advertisement.user.link}
            
          />
            <div className="createdAt-block">
              <Text>Создано </Text>
              <p>{formatDate(new Date(advertisement.creationTime))}</p>
            </div>
          
        </div>
      )}
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

export default memo(ShowMyResponse);
