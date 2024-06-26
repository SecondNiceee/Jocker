import React, { useEffect, useMemo, useRef, useState } from "react";
import AdCreatingOne from "./AdCreatingOne/AdCreatingOne/AdCreatingOne";
import AdCreatingThree from "./AdCreatingThree/AdCreatingThree";
import AdCreatingTwo from "./ADCreatingTwo/AdCreatingTwo/AddCreatingTwo";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addMyAds,
  changeTaskInformation,
  postInformation,
  postMyTask,
} from "../store/information";
import BackButton from "../constants/BackButton";
import MainButton from "../constants/MainButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostLoader from "../loaders/PostLoader";

let spet = 0;
const AdCreating = () => {
  const [taskInformation, setTaskInformation] = useState(
    useSelector((state) => state.information.taskInformation)
  );

  const tonConstant = useSelector((state) => state.ton.value);

  const [stationNow, setStationNow] = useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const blurRef = useRef(null);

  const status = useSelector((state) => state.information.postTaskStatus);

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  useEffect(() => {
    if (categorys && subCategorys) {
      setTaskInformation({
        ...taskInformation,
        category: categorys.find((e) => e.category === "Другое"),
        subCategory: subCategorys.find((e) => e.subCategory === "Нет"),
      });
    }
  }, [categorys, subCategorys]);


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
      if (error.name && taskInformation.taskName.length > 3) {
        setError({ ...error, name: false });
      }
    }
    if (spet === 1) {
      if (error.ton && taskInformation.tonValue > 0.5) {
        setError({ ...error, ton: false });
      }
      if (document.getElementById("dateSwapper").style.transform) {
        if (taskInformation.startTime.length === 0) {
          startError = true;
        }
        if (taskInformation.endTime.length === 0) {
          endError = true;
        }
        if (taskInformation.endTime <= taskInformation.startTime) {
          endError = true;
          startError = true;
        }
      } else {
        if (taskInformation.singleTime.length === 0) {
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
    taskInformation.taskName,
    taskInformation.tonValue,
    taskInformation.startTime,
    taskInformation.endTime,
    taskInformation.singleTime,
  ]);

  function animte() {
    let localSpet = spet;
    setStationNow(spet * -100 - 5);
    setTimeout(() => {
      if (localSpet === spet) {
        setStationNow(spet * -100);
      }
    }, 310);
  }
  function backAnimte() {
    let localSpet = spet;
    setStationNow(spet * -100 + 5);
    setTimeout(() => {
      if (localSpet === spet) {
        setStationNow(spet * -100);
      }
    }, 310);
  }

  function finish() {
    let taskInformationCopy = {...taskInformation}
    if (document.getElementById("dateSwapper").style.transform) {
      taskInformationCopy.time = {start : taskInformation.startTime , end : taskInformation.endTime}
      // setTaskInformation({...taskInformation , time : {start : taskInformation.startTime , end : taskInformation.endTime} })

    } else {
      taskInformationCopy.time = {start : taskInformation.singleTime , end : ''}
    }

    post(taskInformation);
    // dispatch(addMyAds(taskInformationCopy))
    navigate("/MyAds");
    
    // MainButton.hide();
    spet = 0;
  }
  async function post(el) {
    let myFormData = new FormData();
    // myFormData.append("userId", window.Telegram.WebApp.initDataUnsafe.user.id );
     myFormData.append("userId", 2144832745 );
    myFormData.append("title", el.taskName);
    myFormData.append("description", el.taskDescription);
    myFormData.append("deadline", 1);
    myFormData.append("category", taskInformation.category.id);
    myFormData.append("subCategory", taskInformation.subCategory.id);
    myFormData.append("price", el.tonValue);
    if (document.getElementById("dateSwapper").style.transform) {
      myFormData.append("startTime", el.startTime);
      myFormData.append("endTime", el.endTime);
    } else {
      myFormData.append("startTime", el.singleTime);
      myFormData.append("endTime", "");
    }
    // myFormData.append("photos", el.photos);
    

    if (el.photos.length !== 0) {
      for (let file of el.photos) {
        myFormData.append("photos", file);
      }
    }
    
    dispatch(postMyTask([myFormData, el.photos]));
    //   let state = await axios.post(
    //   "https://back-birga.ywa.su/advertisement",
    //   myFormData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //   }
    // );
  }

  function checking() {
    let taskName = false;
    let ton = false;
    let singleError = false;
    let startError = false;
    let endError = false;
    switch (spet) {
      case 0: {
        if (taskInformation.taskName.length < 3) {
          taskName = true;
        }
        setError({ ...error, name: taskName });
        return Object.values({ ...error, name: taskName }).every(
          (value) => value === false
        );
      }
      case 1: {
        if (taskInformation.tonValue < 0.5) {
          ton = true;
        }
        if (document.getElementById("dateSwapper").style.transform) {
          if (taskInformation.startTime.length === 0) {
            startError = true;
          }
          if (taskInformation.endTime.length === 0) {
            endError = true;
          }
          if (taskInformation.endTime <= taskInformation.startTime) {
            endError = true;
            startError = true;
          }
        } else {
          if (taskInformation.singleTime.length === 0) {
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
    }
  }

  function goForward() {
    if (blurRef.current) {
      blurRef.current.focus();
    }
    if (checking()) {
      if (spet !== 2) {
        spet += 1;
        if (spet === 2) {
          MainButton.setText("ЗАХОЛДИРОВАТЬ");
        } else {
          MainButton.setText("Далее");
        }
        animte();
      } else {
        finish();
      }
    }
  }
  function goBack() {
    if (spet === 0) {
      navigate(-1);
    } else {
      spet -= 1;
      backAnimte();

      if (stationNow === -100) {
      }
    }
  }

  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 2;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, []);

  useEffect(() => {
    MainButton.onClick(goForward);
    BackButton.onClick(goBack);
  
    return () => {
      BackButton.offClick(goBack);
      MainButton.offClick(goForward);
    };
  });

  useEffect(() => {
    MainButton.show();
    BackButton.show();
    MainButton.setText("Далее");

    document.documentElement.style.marginTop = "5px";

    window.scrollTo({
      top: 5,
      behavior: "auto",
    });

    document.documentElement.style.overflow = "clip";
    document.querySelector(".MainContainer").style.overflowY = "hidden";

    return () => {
      MainButton.hide();
    };
  }, []);

  return (
    <motion.div
      className="AdCreating__container"
      style={{
        transform: "translateX(" + stationNow.toString() + "%)",
        transition: "0.3s",
      }}
    >
      {status === "pending" ? (
        <>
          <PostLoader />
        </>
      ) : (
        <>
          <AdCreatingOne
            className={"adCreatingOne"}
            errorName={error.name}
            setTaskInformation={setTaskInformation}
            taskInformation={taskInformation}
            MyInformation={false}
            mistakes={{ timeError: false, taskName: false }}
            categorys={categorys}
            subCategorys={subCategorys}
          />
          <AdCreatingTwo
            errors={{
              ton: error.ton,
              singleError: error.singleError,
              startError: error.startError,
              endError: error.endError,
            }}
            GreyIntWidth={GreyIntWidth}
            GreyWidth={GreyWidth}
            setTaskInformation={setTaskInformation}
            taskInformation={taskInformation}
            tonConstant={tonConstant}
          />
          <AdCreatingThree taskInformation={taskInformation} />
        </>
      )}
      <button
        ref={blurRef}
        style={{ position: "absolute" }}
        onClick={() => {
          goForward();
        }}
      >
        Выфвфывфы
      </button>
      <button
        style={{ position: "absolute", left: "100%", zIndex: 20 }}
        onClick={() => {
          goForward();
        }}
      >
        Выфвфывфы
      </button>
      <button
        style={{ position: "absolute", left: "200%", zIndex: 20 }}
        onClick={() => {
          goForward()
        }}
      >
        Отослать
      </button>
    </motion.div>
  );
};

export default AdCreating;
