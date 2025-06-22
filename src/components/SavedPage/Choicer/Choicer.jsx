import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import cl from "./Choicer.module.css";

import ChoicerInfo from "./ChoicerInfo";
import { useSelector } from "react-redux";
import translation from "../../../functions/translate";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";
const Choicer = ({ nowKey, keys, setDetails, setResponce, setCard }) => {
  const savedTasks = useSelector((state) => state.saves.tasks);
  const savedResponces = useSelector((state) => state.saves.responces);
  const savedCards = useSelector((state) => state.saves.cards);
  const tasksStatus = useSelector( (state) => state.saves.advertisementStatus )
  const cardsStatus = useSelector( (state) => state.saves.cardsStatus )
  const responsesStatus = useSelector( (state) => state.saves.reponsesStatus )
  const containerOne = useRef(null);
  const containerTwo = useRef(null);
  const containerThree = useRef(null);

  const pickerRef = useRef(null);

  const [viewsNumber, setViewsNumber] = useState(0);

  const textOne = translation("У вас нет сохраненных заказов")
  const textTwo = translation("У вас нет сохраненных откликов")
  const textThree = translation("У вас нет сохраненных кейсов")

  useEffect( () => {
      if (nowKey === keys[0]){
        if (pickerRef.current && containerOne.current){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerOne.current.offsetHeight + 100) + "px"
        }
          }
      if (nowKey === keys[1]){
        if (pickerRef.current && containerTwo.current ){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerTwo.current.offsetHeight + 100) + "px"}
      }
      if (nowKey === keys[2]){
        if (pickerRef.current && containerThree.current){
          pickerRef.current.style.overflowY = "hidden"
          pickerRef.current.style.minHeight = String(containerThree.current.offsetHeight + 100) + "px"
        }
      }

      return () => {

      }
    }  , [nowKey, keys, savedTasks, savedResponces, savedCards, tasksStatus ,cardsStatus , responsesStatus, viewsNumber ] )

  const style = useMemo(() => {
    switch (nowKey) {
      case keys[0]:
        return {
          transform: "translateX(0%)",
        };
      case keys[1]:
        return {
          transform: "translateX(-100vw)",
        };
      case keys[2]:
        return {
          transform: "translateX(-200vw)",
        };
      default:
        return {
          transform: "translateX(0%)",
        };
    }
  }, [keys, nowKey]);

  
      const {
        isSliderOpened,
        photoIndex,
        photos,
        setPhotoIndex,
        setPhotos,
        setSlideOpened,
      } = useSlider();


  return (
    <>

    <div ref={pickerRef} style={style} className={cl.main}>
      <ChoicerInfo
        setPhotos = {setPhotos}
        setPhotoIndex = {setPhotoIndex}
        setSlideOpened = {setSlideOpened}
        nowKey = {nowKey}
        viewsNumber={viewsNumber}
        setViewsNumber={setViewsNumber}
        ref={containerOne}
        setDetails={setDetails}
        navigate={"task"}
        arr={savedTasks}
        text={textOne}
      />
      <ChoicerInfo
      setPhotos = {setPhotos}
      setPhotoIndex = {setPhotoIndex}
      setSlideOpened = {setSlideOpened}
      nowKey = {nowKey}
        viewsNumber={viewsNumber}
        setViewsNumber={setViewsNumber}
        ref={containerTwo}
        setResponce={setResponce}
        navigate={"response"}
        arr={savedResponces}
        text={textTwo}
      />
      <ChoicerInfo
      setPhotos = {setPhotos}
      setPhotoIndex = {setPhotoIndex}
      setSlideOpened = {setSlideOpened}
      nowKey = {nowKey}
        viewsNumber={viewsNumber}
        setViewsNumber={setViewsNumber}
        ref={containerThree}
        setCard={setCard}
        navigate={"card"}
        arr={savedCards}
        text={textThree}
      />
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

export default memo(Choicer);
