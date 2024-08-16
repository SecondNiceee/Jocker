import React, { memo } from "react";

import share from "../../../images/icons/Share.svg";

import "./../MyAds.css";
import FalseTie from "../../../components/UI/FalseTie/FalseTie";
import MyButton from "../../../components/UI/MyButton/MyButton";
import userPhoto from "../../../images/userPhoto/user.png"
import breakShare from "../../../functions/breakShare";
import Text from "../../../components/Text/Text";
const Reaction = ({
  blue = false,
  setOpen,
  put,
  openAboutReactionFunc,
  responce,
  writeButton = true,
  agree = false,
  lastAds = false
}) => {
  return (
    <>
      <div
        className="reaction"
        style={
          responce.isWatched === "inProcess" && writeButton
            ? { border: "1.67px solid #2ea5ff" }
            : {}
        }
      >
        {responce.photos.length > 0 ? (
          <div className="reactions__images">
            {responce.photos.map((e, i) => (
              <img
                style={responce.photos.length === 1 ? { width: "100%" } : {}}
                src={URL.createObjectURL(e)}
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
              openAboutReactionFunc({ isActive: true, responce: responce });
            }}
            className="icon"
            src={responce.user.photo.length > 0 ? responce.user.photo : userPhoto}
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
              {responce.user.fl}
            </Text>
            <div className="reaction__rates">
              {/* <img src={star} alt="" /> */}
              <div className="rates__text">
                {/* <Text><span>4</span></Text>
                                  <Text>◦</Text>
                                  <Text>158 отзывов</Text>
                                  <Text>◦</Text> */}
                <Text>
                  Стаж{" "}
                  {responce.user.stage === null ? "0" : responce.user.stage} лет
                </Text>
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
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>}


          {put ? (
            <div className="right">

              <MyButton
                hard = {true}
                style = {writeButton ? {} : {display : "none"}}
                onClick={() => {
                  window.Telegram.WebApp.openTelegramLink(
                    "https://t.me/" + responce.user.link
                  );
                }}
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
              onClick={() => {
                window.Telegram.WebApp.openTelegramLink(
                  "https://t.me/" + responce.user.link
                );
              }}
            >
              Написать
            </MyButton>
            {/* <svg style={{
                stroke-width : "1.67px",
                stroke : "#2ea5ff"
              }} width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.0978 1.80176C15.8171 1.80176 16.247 3.18964 16.247 3.88358V19.2571C16.247 20.2179 15.4204 19.8976 14.0978 19.2571L9.46867 17.1752C9.46867 17.1752 9.08075 17.0151 8.64205 17.0151C8.20335 17.0151 7.81542 17.1752 7.81542 17.1752L3.18633 19.2571C1.86373 19.8976 1.03711 20.2179 1.03711 19.2571V3.88358C1.03711 2.21812 2.46992 1.80176 3.18633 1.80176H14.0978Z" stroke="#2EA5FF" stroke-width="1.66667" />
</svg> */}
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
