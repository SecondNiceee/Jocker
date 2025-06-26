import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { CSSTransition } from "react-transition-group";

import SmallTextarea from "../../components/UI/SmallTextarea/SmallTextarea";
import Compact from "../../components/UI/Compact/Compact";
import SmallInput from "../../components/UI/SmallInput/SmallInput";
import AdCreateFunc from "../../components/UI/AdCreateFunc/AdCreateFunc";
import MainButton from "../../constants/MainButton";
import Cards from "../Cards/Cards";
import Options from "./components/Options/Options";
import ChangeCards from "../ChangeCard/ChangeCard";
import {
  changeProfile,
  putUserInfo,
} from "../../store/telegramUserInfo";
import pagesHistory from "../../constants/pagesHistory";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import CardsArray from "./components/CardsArray/CardsArray";
import translation from "../../functions/translate";
import PayBlock from "./components/PayBlock/PayBlock";
import useBlockInputs from "../../hooks/useBlockInputs";
import useStartControllerMainButton from "./hooks/useStartControllerMainButton";
import useProfileStyle from "./hooks/useProfileStyle";
import useDeleteCardFunction from "./hooks/useDeleteCardFunction";
import useYearAdittionInputs from "./hooks/useYearAdittionInputs";
import { useStageInputController } from "../BaidgeCreating/hooks/useStageInputController";
import useBackButton from "./hooks/useBackButton";
import ProfileCup from "./components/ProfileCup/ProfileCup";

let aboutULocal = null;

const menu = document.documentElement.querySelector(".FirstMenu");
const Profile = () => {

  const mainRef = useRef(null);

  window.Telegram.WebApp.disableVerticalSwipes();

  const [index, setIndex] = useState(1);

  useEffect(() => {
    MainButton.hide()
    return () => {
      pagesHistory.push("/Profile");
    };
  }, []);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.telegramUserInfo);

  const [errors, setErrors] = useState({
    stageError: false,
  });

  const [cardsActive, setCardsActive] = useState(false);

  const [changeActive, setChangeActive] = useState(false);

  const changer = useSelector((state) => state.menuSlice.changer);

  useEffect(() => {
    setCardsActive(false);
    setChangeActive(false);
  }, [changer]);

  const [aboutU, setAboutU] = useState({
    ...userInfo.profile,
    stage: userInfo.profile.stage,
    userId: userInfo.id,
  });

  const cards = useSelector((state) => state.telegramUserInfo.profile.cards);

  aboutULocal = aboutU;

  const save = useCallback(() => { // Функция сохранения профиля 
    dispatch(changeProfile({...aboutU , about : aboutU.about.trim()}));
    dispatch(
      putUserInfo([
        { stage: Number(aboutU.stage), about: aboutU.about.trim() },  
      ])
    );
    const input = document.querySelectorAll("input");
    const textarea = document.querySelectorAll("textarea");
    for (let smallInput of input) {
      smallInput.blur();
    }
    for (let smallTextarea of textarea) {
      smallTextarea.blur();
    }
  }, [dispatch, aboutU]);
  

  useEffect(() => { // Просто логика появления и уисчезновения кнопки , в заивисимости от изменений стажа и О себе
    function compare2Objects(x, y) {
      if (x.about === y.about && x.stage === y.stage) {
        return true;
      } else {
        return false;
      }
    }
    if (!cardsActive && !changeActive) {
      if (compare2Objects(userInfo.profile, {...aboutU, about : aboutU.about.trim()}) === false && userInfo.state === "yes" && userInfo.profile.about !== null && aboutU.about !== null) {
        MainButton.enable();
        MainButton.setParams({
          text: translation("Сохранить"),
          is_visible: true,
        });
        MainButton.onClick(save);
        menu.classList.add("disappearAnimation");
        menu.classList.remove("appearAnimation");

        if (!MainButton.isVisible) {
          MainButton.show();
        }

        if (aboutU.stage >= 40) {
          MainButton.disable();
          MainButton.setParams({
            color: "#2f2f2f",
            text_color: "#606060",
          });
          setErrors((value) => ({ ...value, stageError: true }));
        } else {
          if (errors.stageError) {
            MainButton.enable();
            setErrors((value) => ({ ...value, stageError: false }));
          }
          MainButton.setParams({
            color: "#2ea5ff",
            text_color: "#ffffff",
          });
        }
      } else {
        menu.classList.add("appearAnimation");
        menu.classList.remove("disappearAnimation");
        MainButton.hide();
        MainButton.offClick(save);
      }
    } else {
      MainButton.offClick(save);
    }
  }, [
    aboutU,
    userInfo.state,
    changeActive,
    cardsActive,
    save,
    errors.stageError,
    userInfo.profile,
  ]);

  useBackButton({cardsActive, changeActive})

  useYearAdittionInputs({userInfo}); //  Логика добавления год / года к инпуту

  const {onBlurFunc, onFocusFunc, setValueFunc} = useStageInputController({setAboutU, aboutU})

  const deleteFunction = useDeleteCardFunction()

  const postStatus = useSelector((state) => state.telegramUserInfo.postState);
  const putStatus = useSelector((state) => state.telegramUserInfo.putState);

  useBlockInputs();

  const profileStyle = useProfileStyle({cardsActive, changeActive}) // Логика изменения left профиля (для появления и удаления карточки)

  useStartControllerMainButton(); // Логика появления кнопки перед рендером и после рендера странички (перед входом и выходом из неё)

  return (
    <>
      {userInfo.state !== "yes" ? (
        <MyLoader />
      ) : (
        <div
        
          ref={mainRef}
          className="profile__wrapper"
          style={profileStyle}
        >
          <div className="profile__container">

            <ProfileCup /> 

            <PayBlock className="pay-block" />

            <Options />

            <Compact title={"О себе"} className={"compact-block"}>
              <SmallTextarea
                value={aboutU.about}
                setValue={(e) => {
                  setAboutU({ ...aboutULocal, about: e });
                }}
              />
            </Compact>

            <Compact title={"Стаж работы"} className={"compact-block"}>
              <SmallInput
                mistakeText={"Стаж должен быть меньше 40 лет!"}
                mistake={errors.stageError}
                id="numberInput"
                maxLength={2}
                onBlur={onBlurFunc}
                onFocus={onFocusFunc}
                inputMode="numeric"
                // type = "number"
                value={aboutULocal.stage === null ? "0" : aboutULocal.stage}
                setValue={setValueFunc}
              />
            </Compact>

            <Compact title={"Примеры работ"} className={"compact-block"}>
              <AdCreateFunc
                text={"Добавить кейс"}
                style={
                  cards.length >= 6 ? { display: "none" } : { marginTop: "0px" }
                }
                func={(e) => {
                  setCardsActive(true);
                }}
              />
            </Compact>

            {postStatus === "pending" || putStatus === "pending" ? (
              <MyLoader style={{ transform: "translateX(-8px)" }} />
            ) : (
              <CardsArray
                deleteFunction={deleteFunction}
                cards={cards}
                setChangeActive={setChangeActive}
                setIndex={setIndex}
              />
            )}
          </div>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={cardsActive}
            timeout={400}
          >
            <Cards
              save={save}
              aboutU={aboutU}
              setAboutU={setAboutU}
              setCardsOpen={setCardsActive}
            />
          </CSSTransition>

          <CSSTransition
            mountOnEnter
            unmountOnExit
            in={changeActive}
            timeout={400}
          >
            <ChangeCards
              save={save}
              index={index}
              card={cards[index]}
              aboutU={aboutU}
              setAboutU={setAboutU}
              setCardsOpen={setChangeActive}
            />
          </CSSTransition>


        </div>
      )}
    </>
  );
};

export default Profile;
