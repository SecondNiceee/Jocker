import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import GreyText from "../../components/UI/GreyText/GreyText";
import { changeMenuActive } from "../../store/menuSlice";
import ShablonsWrap from "./components/ShablonsWrap/ShablonsWrap";
import { CSSTransition } from "react-transition-group";
import Shablon from "../Shablon/Shablon";
import { deleteShablon } from "../../store/shablon";
import { useNavigate } from "react-router-dom";
import BackButton from "../../constants/BackButton";
import pagesHistory from "../../constants/pagesHistory";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import MainButton from "../../constants/MainButton";
import MyAnimation from "../MyAds/components/MyAnimation";
const menu = document.documentElement.querySelector(".FirstMenu")
const AllShablons = () => {

  window.Telegram.WebApp.disableVerticalSwipes();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect( () => {
    return () => {
      pagesHistory.push('/AllShablons')
    }
  } , [] )

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );

  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);

  const [shablon, setShablon] = useState({
    isActive: false,
    shablon: {
      id: 0,
      name: "",
      text: "",
      photos: [],
      photosNames: [],
    },
    put : false
  });

  function clickOnFunc() {
    setShablon({
      isActive: true,
      shablon: {
        id: 0,
        name: "",
        text: "",
        photos: [],
        photosNames: [],
      },
      put : false
    });
  }



  const putFunction = useCallback((e) => {

    setShablon({
        isActive : true,
        shablon : e,
        put : true
    })
  } , [ setShablon])

  const deleteFunction = useCallback((e) => {
    window.Telegram.WebApp
    .showPopup({
      title: "Удалить?",
      message: "Вы хотите удалить этот шаблон?",
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        // setShablon({...shablon , isActive : false})
      }
      if (buttonId === "save") {

        dispatch(deleteShablon(e.id))
    } })
    
  }, [dispatch])


  useEffect( () => {
    function back(){
      if (shablon.isActive){
          setShablon( (value) =>  ({...value , isActive : false})   )      
      }
      else{
        navigate(-1)
      }
    }
    BackButton.onClick(back)
    return () => {
      BackButton.offClick(back)
    }
  } , [shablon.isActive, navigate] )
  const postStatus = useSelector( state => state.shablon.postStatus )
  const putStatus = useSelector(  state => state.shablon.putStatus )

  useEffect( () => {
    
    const input = document.querySelectorAll('input');
    const textarea  = document.querySelectorAll('textarea');
    for (let smallInput of input){
      smallInput.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallInput.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
    for (let smallTextarea of textarea){
      smallTextarea.addEventListener('focus', () => {
        menu.style.display = 'none'; // скрываем меню
      });
      smallTextarea.addEventListener('blur', () => {
        menu.style.display = 'flex'; // скрываем меню
      });
    }
  } , [] )


  return (
    <div className="all-shablon-wrapper">
      {postStatus === "pending" || putStatus === "pending" ? <MyLoader style = {{transform : "translateX(-8px)"}} /> 
      :
      <>

      {shablonsArr.length === 6 ?  <></>
      :
      <AdCreateFunc
        className="all-shablons-func"
        text={"Создать новый шаблон"}
        func={clickOnFunc}
      />
      }

      {shablonsArr.length > 0 ? (
        <GreyText className={"shablon-wrapper-grey"}>
          АКТУАЛЬНЫЕ ШАБЛОНЫ
        </GreyText>
      ) : (
        <></>
      )}

      {shablonsArr.length === 0 ? 
        <MyAnimation style = {{height : "80vh"}} text="У вас нет ни одного шаблона" />
        :
      <ShablonsWrap deleteFunction = {deleteFunction} className={"shablons-wrap"} shablonsArr={shablonsArr} putFunction = {putFunction}  />
      }

      <CSSTransition
        in={shablon.isActive}
        classNames={"left-right"}
        mountOnEnter
        unmountOnExit
        timeout={400}
      >
        <Shablon shablon={shablon.shablon} setActive={(e) => {
          setShablon((value) => ({...value , isActive : e}))
        }} setShablon={(e) => {
          setShablon((value) => ({...value , shablon : e}))
        }} put = {shablon.put} />
      </CSSTransition>
      </>
}
    </div>
  );
};

export default AllShablons;
