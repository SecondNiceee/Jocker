import React, { memo, useCallback } from "react";

import share from "../../../images/icons/Share.svg";

import "./../MyAds.css";
import FalseTie from "../../../components/UI/FalseTie/FalseTie";
import MyButton from "../../../components/UI/MyButton/MyButton";
import userPhoto from "../../../images/userPhoto/user.png"
import breakShare from "../../../functions/breakShare";
import Text from "../../../components/Text/Text";
import en from "../../../constants/language";
import translation from "../../../functions/translate";
import { useNavigate } from "react-router";


const Reaction = ({
  blue = false,
  setOpen,
  put,
  openAboutReactionFunc,
  responce,
  writeButton = true,
  agree = false,
  lastAds = false,
  setPhotos,
  setPhotoIndex,
  setSlideOpened
}) => {

  const getAge = useCallback( (par) => {
    if (en){
      if (Number(par) === 1){
        return "year"
      }
      else{
        return "years"
      }
    }
    else{
      let numb = Number(String(par).slice(String(par).length - 1 , String(par).length))
      if ( Number(par) > 10 && Number(par) < 20){
        return "лет"
      }
      else{
  
          if (numb > 1 && numb < 5){
            return `года`
          }
          else{
            if(numb === 1){
              return `год`
            }
            else{
              return "лет"
            }
          }
        }
      
      
      /// какая - то логика лет 
    }
  } , []  )


  
  console.log(responce)


  const openTelegrmaLink = useCallback( () => {
    if (responce.user.link && responce.user.link !== "-1" ){
        window.Telegram.WebApp.openTelegramLink(
            "https://t.me/" + responce.user.link
          );
    }
    else{
        window.Telegram.WebApp
        .showPopup({
          title: translation("Упс"),
          message: "Похоже, у пользователя закрытый профиль",
          buttons: [
            { id: "save", type: "default", text: "Понятно" },
          ],
        } , (buttonId) => {
    
          if (buttonId === "save" || buttonId === null) {
            console.log("Ok");
            
          }
    
    
        } )
    }

} , [responce.user.link] )


  const imageOnClick = (index) => () => {
    setPhotos(responce.photos)
    setPhotoIndex(index)
    setSlideOpened(true)
  }

  const navigate = useNavigate();

  return (
    <>
      <div
        className="reaction"
        style={
          (responce.isWatched === "inProcess" || responce.isWatched === "completed")  && writeButton
            ? { border: "1.67px solid #2ea5ff" }
            : {}
        }
      >
        {responce.photos.length > 0 ? (
          <div className="reactions__images">
            {responce.photos.map((e, i) => (
              <img
                onClick={imageOnClick(i)}
                style={responce.photos.length === 1 ? { width: "100%" } : {}}
                src={e}
                alt=""
                key={i}
              />
            ))}
          </div>
        ) : (
          <></>
        )}

        <div className="reaction__middle">
          <img
            style={{objectFit : "cover"}}
            onClick={() => {
              navigate(`/Baidge/${responce.user.id}`)
            }}
            
            className="icon"
            src={ responce.user.photo ? responce.user.photo.length > 0 ? responce.user.photo.split('https://').length === 2 ? responce.user.photo : `${process.env.REACT_APP_HOST}/${responce.user.id}/${responce.user.photo}` : userPhoto : userPhoto}
            alt=""
          />
          <div
            onClick={() => {
              openAboutReactionFunc({ isActive: true, responce: responce });
            }}
            className="reaction__middle-midle"
          >
            <Text
              className="reaction__userName"
              style={
                blue
                  ? {
                      textDecoration: "underline",
                      color: "#2ea5ff",
                      textUnderlineOffset: "2px",
                    }
                  : {}
              }
            >
              {  responce.user.fl.length > 9 ? responce.user.fl.slice(0,9) + '...' : responce.user.fl}
            </Text>
            <div className="reaction__rates">
              {/* <img src={star} alt="" /> */}
              <div className="rates__text">
                {/* <Text><span>4</span></Text>
                                  <Text>◦</Text>
                                  <Text>158 отзывов</Text>
                                  <Text>◦</Text> */}
                <Text>Стаж </Text>

                <p>
                  {responce.user.stage === null ? "0" : responce.user.stage} 
                </p>
                <p>{getAge(responce.user.stage)}</p>
              </div>
            </div>
          </div>
          
          { (responce.isWatched === "inProcess" && writeButton && !lastAds) &&           <div className="blue-circle">
            <svg
            className="commit-icon"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.21484 8.14672L3.67722 10.4449L10.141 4.41211M14.4501 4.55575L7.98639 10.5886L7.2169 9.87039"
                stroke="#2EA5FF"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>}


          {put ? (
            <div className="right">

              <MyButton
                hard = {true}
                style = {writeButton ? {} : {display : "none"}}
                onClick={openTelegrmaLink}
              >
                Написать
              </MyButton>

              <FalseTie
                agree={agree}
                navigate={"responce"}
                task={responce}
                id={responce.id}
              />
              <div className="circle" onClick={breakShare}  style={{opacity : 0.5}}>
                <img className="shareImage" src={share} alt="" />
              </div>
            </div>
          ) : (
            <div onClick={breakShare}  className="circle" style={(responce.isWatched === "inProcess" && writeButton && !lastAds) ? {marginLeft : "8px" , opacity : 0.5} : {opacity : 0.5}}>
              <img  className="shareImage" src={share} alt="" />
            </div>
          )}
        </div>
        {put ? (
          <div
            style={{
              marginBottom: "18px",
            }}
          ></div>
        ) : (
          <div className="reactions__bottom">
            <MyButton
            blue = {false}
              onClick={() => {
                setOpen({
                  isActive: true,
                  responce: responce,
                });
              }}
              className="bottom__one"
            >
              подробнее
            </MyButton>
            <MyButton
              hard = {true}
              className="bottom__two"
              onClick={openTelegrmaLink}
            >
              Написать
            </MyButton>
            <FalseTie
              agree={agree}
              navigate={"responce"}
              task={responce}
              id={responce.id}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Reaction);
