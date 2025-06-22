import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CardsFilterEnum } from "./enums/CardsFilterEnum";
import { useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import CardsPageBody from "./CardsPageBody";
import useSlider from "../../hooks/useSlider";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import menuController from "../../functions/menuController";
import { useNavigate } from "react-router";
import MainButton from "../../constants/MainButton";
import useNavigateBack from "../../hooks/useNavigateBack";
import { enableColorAndActiveButton } from "../../functions/enableColorAndActiveButton";
import NoCards from "./components/NoCards";
import useAddHistory from "../../hooks/useAddHistory";

const NewCardsPage = () => {

  const [filter, setFilterBy] = useState(CardsFilterEnum.WATCHES);

  const postState = useSelector((state) => state.telegramUserInfo.postState);

  const putState = useSelector((state) => state.telegramUserInfo.putState);

  const baidgeUser = useSelector( (state) => state.information.baidgeUser );
  
  const me = useSelector( (state) => state.telegramUserInfo )

  const userInfo = useMemo( () => {
    if (me?.id === baidgeUser?.id){
      return me
    }
    else{
      return baidgeUser;
    }
  }, [me,baidgeUser] )


  const navigate = useNavigate();

  const {isSliderOpened, photoIndex, photos, setPhotoIndex, setPhotos, setSlideOpened} = useSlider();

  const createCard = useCallback( () => {
    if (!isSliderOpened){
      navigate('/cardCreation')
    }
    else{
      setSlideOpened(false)
    }
  },[navigate, isSliderOpened, setSlideOpened] )

  console.log(filter);

  const BackFunction = useCallback( () => {
    if (!isSliderOpened){
      navigate(-1)
    }
    else{
      setSlideOpened(false)
    }
  }, [navigate, isSliderOpened, setSlideOpened] )


  useEffect( () => {
    MainButton.show();
    enableColorAndActiveButton();
    if (isSliderOpened){
      MainButton.setText("Закрыть")
    }
    else{

      if (userInfo?.id === me?.id){
        MainButton.setText("Добавить кейс")
      }
      else{
        MainButton.setText("Hазад");
      }
    }
  }, [userInfo, me, isSliderOpened] )

  useEffect( () => {
    if (userInfo?.id === me?.id){
      MainButton.onClick(createCard);
    }
    else{
      MainButton.onClick(BackFunction)
    }
    return () => {
      MainButton.offClick(createCard);
      MainButton.offClick(BackFunction);
    }
  }, [createCard, BackFunction, me, userInfo] )

  useNavigateBack({isSliderOpened : isSliderOpened, setSlideOpened : setSlideOpened});
  useEffect( () => {
    menuController.hideMenu();
  }, [] )
  
  const cards = userInfo?.profile?.cards;

    const filteredArray = useMemo( () => {
    if (cards){
      if (filter === "WATCHES"){
        return [...cards].sort((a, b) => b.views - a.views);
      }
  
        return [...cards].reverse();
      
    } 
    return []
  }, [filter, cards] )

  console.log(postState, putState, userInfo)
  
  useAddHistory();

  if (postState === "pending" || putState === "pending" || !userInfo) {
    return <MyLoader />;
  }

  return (
    <>
    <div onClick={createCard} className="fixed left-1/2 z-50 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer">
      MAIN BUTTON
    </div>

    <div className="pt-[16px] z-20 left-0 top-0 w-full  px-[16px] bg-[#18222d] flex flex-col pb-[20px]">
      {!cards.length ? (
        <NoCards />
      ) : (
        <CardsPageBody
          userInfo = {userInfo}
          cards={filteredArray}
          setFilterBy={setFilterBy}
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
        />
      )}
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

export default NewCardsPage;
