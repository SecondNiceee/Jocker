import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AdCreatingOne from "../AdCreatingOne/ui/AdCreatingOne/AdCreatingOne";
import AdCreatingTwo from "../ADCreatingTwo/AdCreatingTwo/AddCreatingTwo";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";
import { useNavigate } from "react-router-dom";
import PostLoader from "../../loaders/PostLoader";
import translation from "../../functions/translate";
import { CSSTransition } from "react-transition-group";
import useBlockInputs from "../../hooks/useBlockInputs";
import menuController from "../../functions/menuController";
import { setFirstPage } from "../../store/taskCreating";
import TaskCreatingDetails from "../../components/First/FirstDetails/TaskCreatingDetails";
import useFetchRating from "../../hooks/useFetchRating";
import { useAddPageHistory } from "../../hooks/useAddPageHistory";
import useScrollToZero from "../../hooks/useScrollToZero";
import useUploadCategorys from "./hooks/useUploadCategorys";
import usePrepareAndPostTask from "./hooks/usePrepareAndPostTask";
import DevelopmentMainButton from "../../components/UI/DevelopmentMainButton/DevelopmentMainButton";
let spet = 0;
const endText = translation("СОЗДАТЬ ЗАДАНИЕ");
const continueText = translation("ДАЛЕЕ");

const AdCreating = () => {
  useBlockInputs();

  const me = useSelector((state) => state.telegramUserInfo);

  const firstPage = useSelector((state) => state.taskCreating.firstPage);
  const secondPage = useSelector((state) => state.taskCreating.secondPage);
  const dispatch = useDispatch();

  const setFirstPageWithDispatch = useCallback((value) => {
    dispatch(setFirstPage(value))
  }, [dispatch])

  useEffect(() => {
    setFirstPageWithDispatch({
        userPhoto: me.photo ? me.photo : "",
        customerName: me.firstName,
      });
  }, [me, dispatch, setFirstPageWithDispatch]);

  const tonConstant = useSelector((state) => state.ton.value);

  const navigate = useNavigate();

  const blurRef = useRef(null);

  const status = useSelector((state) => state.information.postTaskStatus);

  const subCategorysStatus = useSelector(
    (state) => state.categorys.subCategoryStatus
  );

  const categorysStatus = useSelector(
    (state) => state.categorys.categoryStatus
  );

  useEffect(() => {
    menuController.lowerMenu();
  }, []);

  useAddPageHistory();

  useScrollToZero();

  useUploadCategorys();

  const post = usePrepareAndPostTask();

  const [error, setError] = useState({
    name: false,
    ton: false,
    singleError: false,
    startError: false,
    endError: false,
  });

  useEffect(() => {
    let startError = false;
    let endError = false;
    let singleError = false;
    if (spet === 0) {
      if (error.name && firstPage.taskName.length > 3) {
        setError({ ...error, name: false });
      }
    }
    if (spet === 1) {
      if (error.ton && Number(secondPage.budget.replace(/\s+/g, "")) >= 500) {
        setError({ ...error, ton: false });
      }
      if (document.getElementById("dateSwapper").style.transform) {
        if (secondPage.startTime.getTime() === new Date(0).getTime()) {
          startError = true;
        }
        if (secondPage.endTime.getTime() === new Date(0).getTime()) {
          endError = true;
        }
        if (secondPage.endTime <= secondPage.startTime) {
          endError = true;
          startError = true;
        }
      } else {
        if (secondPage.singleTime.getTime() === new Date(0).getTime()) {
          singleError = true;
        }
      }
      if (
        (error.singleError === true &&
          !document.getElementById("dateSwapper").style.transform) ||
        ((error.startError === true || error.endError === true) &&
          document.getElementById("dateSwapper").style.transform)
      ) {
        if (
          error.singleError !== singleError ||
          error.startError !== startError ||
          error.endError !== endError
        ) {
          setError({
            ...error,
            singleError: singleError,
            startError: startError,
            endError: endError,
          });
        }
      }
    }
  }, [
    error,
    firstPage.taskName,
    secondPage.budget,
    firstPage.tonValue,
    secondPage.startTime,
    secondPage.endTime,
    secondPage.singleTime,
    secondPage.tonValue,
  ]);

  function finish() {
    let secondPageCopy = { ...secondPage };
    if (document.getElementById("dateSwapper").style.transform) {
      secondPageCopy.time = {
        start: secondPageCopy.startTime,
        end: secondPageCopy.endTime,
      };
      // setTaskInformation({...taskInformation , time : {start : taskInformation.startTime , end : taskInformation.endTime} })
    } else {
      secondPageCopy.time = { start: secondPageCopy.singleTime, end: "" };
    }
    let localTaskInformation = { ...secondPageCopy, ...firstPage };
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    post(localTaskInformation);
    
    spet = 0;
  }


  useEffect(() => {
    if (spet === 2) {
      if (mainRef.current) {
        mainRef.current.style.paddingBottom = "76px";
      }
    } else {
      if (mainRef.current) {
        if (spet === 1) {
          mainRef.current.style.paddingBottom = "0px";
        } else {
          mainRef.current.style.paddingBottom = "76px";
        }
      }
    }
  }, []);

  const mainRef = useRef(null);

  function checking() {
    let taskName = false;
    let ton = false;
    let singleError = false;
    let startError = false;
    let endError = false;
    switch (spet) {
      case 0: {
        if (firstPage.taskName.length < 3) {
          taskName = true;
        }
        setError({ ...error, name: taskName });
        return Object.values({ ...error, name: taskName }).every(
          (value) => value === false
        );
      }
      case 1: {
        if (Number(secondPage.budget.replace(/\s+/g, "")) < 500) {
          ton = true;
        }
        if (document.getElementById("dateSwapper").style.transform) {
          if (secondPage.startTime.getTime() === new Date(0).getTime()) {
            startError = true;
          }
          if (secondPage.endTime.getTime() === new Date(0).getTime()) {
            endError = true;
          }
          if (secondPage.endTime <= secondPage.startTime) {
            endError = true;
            startError = true;
          }
        } else {
          if (secondPage.singleTime.getTime() === new Date(0).getTime()) {
            singleError = true;
          }
        }

        setError({
          ...error,
          ton: ton,
          singleError: singleError,
          startError: startError,
          endError: endError,
        });
        return Object.values({
          ...error,
          ton: ton,
          singleError: singleError,
          startError: startError,
          endError: endError,
        }).every((value) => value === false);
      }
      case 2: {
        return true;
      }
      default: {
        window.Telegram.WebApp.showAlert("Error (что - то не так пошло..");
        return false;
      }
    }
  }

  useEffect(() => {
    if (firstPage.taskDescription.length > 500) {
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
    } else {
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
    }
  }, [firstPage.taskDescription, navigate]);

  useEffect(() => {
    var inputs = document.getElementsByTagName("input");
    // Проходим по каждому инпуту и удаляем фокус
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].blur();
    }
  }, []);

  // eslint-disable-next-line
  const goForward = () => {
    if (blurRef.current) {
      blurRef.current.focus();
    }
    if (checking()) {
      mainRef.current.classList.remove("oneBack");
      mainRef.current.classList.remove("twoBack");
      if (spet === 0) {
        mainRef.current.classList.add("stepOne");
      }
      if (spet === 1) {
        mainRef.current.classList.add("stepTwo");
      }
      spet += 1;

      if (spet === 2 || spet === 3) {
        MainButton.setText(endText);
      } else {
        MainButton.setText(continueText);
      }
      if (spet === 3){
         finish();
      }
    } else {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    }
  };

  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.disableVerticalSwipes();

  const goBack = useCallback(() => {
    setError({
      name: false,
      ton: false,
      singleError: false,
      startError: false,
      endError: false,
    });
    if (spet === 0) {
      navigate(-1);
    } else {
      if (spet === 1) {
        mainRef.current.classList.remove("stepOne");
        mainRef.current.classList.remove("stepTwo");
        mainRef.current.classList.add("oneBack");
      }
      if (spet === 2) {
        mainRef.current.classList.remove("stepTwo");
        mainRef.current.classList.remove("stepOne");
        mainRef.current.classList.add("twoBack");
      }
      spet -= 1;
      MainButton.setText(continueText);
    }
  }, [navigate]);

  const GreyIntWidth = useMemo(() => {
    if (document.documentElement.clientWidth - 36 > 464) {
      return 232;
    }
    return (document.documentElement.clientWidth - 36) / 2;
  }, []);
  
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);

  const [whichOne, setWhichOne] = useState("startOnly");

  window.Telegram.WebApp.disableVerticalSwipes();

  useEffect(() => {
    MainButton.onClick(goForward);
    BackButton.onClick(goBack);

    return () => {
      BackButton.offClick(goBack);
      MainButton.offClick(goForward);
    };
    // eslint-disable-next-line
  }, [goBack, goForward]);

  useEffect(() => {
    MainButton.show();
    BackButton.show();
    MainButton.setText(continueText);
  }, []);

  const twoPages = useMemo(() => {
    return {
      ton: error.ton,
      singleError: error.singleError,
      startError: error.startError,
      endError: error.endError,
    };
  }, [error]);

  useEffect(() => {
    return () => {
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
    };
  }, []);

  useFetchRating({isItMe : true})
  return (
    <motion.div ref={mainRef} className="AdCreating__container">
      <DevelopmentMainButton goForward={goForward} className={'!left-1/2'} />
      <DevelopmentMainButton goForward={goForward} className={'!left-[120vw]'} />
      <DevelopmentMainButton goForward={goForward} className={'!left-[220vw]'} />
      {status === "pending" ||
      categorysStatus !== "OK" ||
      subCategorysStatus !== "OK" ? (
        <>
          <PostLoader />
        </>
      ) : (
        <>
          <AdCreatingOne
            className={"adCreatingOne"}
            errorName={error.name}
            MyInformation={false}
            mistakes={{ timeError: false, taskName: false }}
          />
          <AdCreatingTwo
            whichOne={whichOne}
            setWhichOne={setWhichOne}
            errors={twoPages}
            GreyIntWidth={GreyIntWidth}
            GreyWidth={GreyWidth}
            taskInformation={secondPage}
            tonConstant={tonConstant}
          />
          <div className="adCreatingThree-wrapper">
            <CSSTransition
              timeout={0}
              in={spet !== 0}
              unmountOnExit
              mountOnEnter
            >
              <TaskCreatingDetails orderInformation={{
                  ...firstPage,
                  ...secondPage,
                  rubleValue: Number(secondPage.budget?.replace(/\s+/g, "")),
                  user: me,
                  category: firstPage?.category?.id,
                  whichOne: whichOne,
                }}  />

            </CSSTransition>
          </div>

        </>
      )}
    </motion.div>
  );
};

export default AdCreating;
