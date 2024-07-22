import React, { useEffect, useMemo, useRef, useState } from "react";
import AdCreatingOne from "./AdCreatingOne/AdCreatingOne/AdCreatingOne";
import AdCreatingThree from "./AdCreatingThree/AdCreatingThree";
import AdCreatingTwo from "./ADCreatingTwo/AdCreatingTwo/AddCreatingTwo";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  postMyTask,
} from "../store/information";
import BackButton from "../constants/BackButton";
import MainButton from "../constants/MainButton";
import { useNavigate } from "react-router-dom";
import PostLoader from "../loaders/PostLoader";
import pagesHistory from "../constants/pagesHistory";
import FirstDetails from "../components/First/FirstDetails/FirstDetails";

let spet = 0;
const AdCreating = () => {
  // const [taskInformation, setTaskInformation] = useState(
  //   useSelector((state) => state.information.taskInformation)
  // );

  
  const me = useSelector(state => state.telegramUserInfo)

  const [firstPage , setFirstPage] = useState({
    category: { name: "", value: "" },
    subCategory: "Выбрать",
    taskName: "",
    taskDescription: "",
    photos: [],
    customerName : me.firstName,
    creationTime : new Date(),
    userPhoto : me.photo,
    time : {start : new Date() , end : new Date(),

    }
  })

  const [secondPage , setSecondPage] = useState({
    budget: 0,
    tonValue: 0,
    startTime : "",
    endTime : "",
    singleTime : "",
    isPrivate : false,
    time : {start : new Date() , end : new Date()}
  })


  const tonConstant = useSelector((state) => state.ton.value);


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const blurRef = useRef(null);

  const status = useSelector((state) => state.information.postTaskStatus);

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  useEffect(() => {
    if (categorys && subCategorys) {
      setFirstPage(
        (value) => ({...value,
        category: categorys.find((e) => e.category === "Другое"),
        subCategory: subCategorys.find((e) => e.subCategory === "Нет"),
      })
      );
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
      if (error.name && firstPage.taskName.length > 3) {
        setError({ ...error, name: false });
      }
    }
    if (spet === 1) {
      if (error.ton && secondPage.tonValue > 0.5) {
        setError({ ...error, ton: false });
      }
      if (document.getElementById("dateSwapper").style.transform) {
        if (secondPage.startTime.length === 0) {
          startError = true;
        }
        if (secondPage.endTime.length === 0) {
          endError = true;
        }
        if (secondPage.endTime <= secondPage.startTime) {
          endError = true;
          startError = true;
        }
      } else {
        if (secondPage.singleTime.length === 0) {
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
    firstPage.tonValue,
    secondPage.startTime,
    secondPage.endTime,
    secondPage.singleTime,
    secondPage.tonValue
  ]);


  function finish() {
    let secondPageCopy = {...secondPage}
    if (document.getElementById("dateSwapper").style.transform) {
      secondPageCopy.time = {start : secondPageCopy.startTime , end : secondPageCopy.endTime}
      // setTaskInformation({...taskInformation , time : {start : taskInformation.startTime , end : taskInformation.endTime} })

    } else {
      secondPageCopy.time = {start : secondPageCopy.singleTime , end : ''}
    }
    let localTaskInformation = {...secondPageCopy , ...firstPage}

    post(localTaskInformation);
    // dispatch(addMyAds(taskInformationCopy))

    
    navigate("/MyAds");
    
    // MainButton.hide();
    spet = 0;
  }
  async function post(el) {
    let myFormData = new FormData();
    // myFormData.append("userId", 2144832745 );
     myFormData.append("userId", 2144832745  );
    myFormData.append("title", el.taskName);
    myFormData.append("description", el.taskDescription);
    myFormData.append("deadline", 1);
    myFormData.append("views", 0);
    myFormData.append("category", el.category.id);
    myFormData.append("subCategory", el.subCategory.id);
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

  useEffect( () => {
    return () => {
      pagesHistory.push('/AdCreating')
    }
  } , [] )
  const mainRef = useRef(null)
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
        if (secondPage.tonValue < 0.5) {
          ton = true;
        }
        if (document.getElementById("dateSwapper").style.transform) {
          if (secondPage.startTime.length === 0) {
            startError = true;
          }
          if (secondPage.endTime.length === 0) {
            endError = true;
          }
          if (secondPage.endTime <= secondPage.startTime) {
            endError = true;
            startError = true;
          }
        } else {
          if (secondPage.singleTime.length === 0) {
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
        alert('Error (что - то не так пошло..')
        return false
      }
    }
  }

  function goForward() {
    if (blurRef.current) {
      blurRef.current.focus();
    }
    if (checking()) {
      mainRef.current.classList.remove('oneBack')
      mainRef.current.classList.remove('twoBack')
      if (spet === 0){
          mainRef.current.classList.add('stepOne')
      }
      if (spet === 1){
        mainRef.current.classList.add('stepTwo')
      }

      spet += 1;
      
        // spet += 1;
        // animte()
        if (spet === 2 || spet === 3) {
          MainButton.setText("СОЗДАТЬ ЗАДАНИЕ");
        } else {
          MainButton.setText("ДАЛЕЕ");
        }
        if (spet === 3){


          window.Telegram.WebApp.showPopup({
            title: "Создать?",
            message: `За создание бессмысленных заданий вы будете забанены. \nСоздать задание?`,
            buttons: [
              { id: "save", type: "default", text: "Да" },
              { id: "delete", type: "destructive", text: "Нет" },
            ],
          } , (buttonId) => {
      
            if (buttonId === "delete" || buttonId === null) {
              spet -= 1
            }
            if (buttonId === "save") {
              finish();
            }
          } )


        }
      
    }
  }
  function goBack() {
    if (spet === 0) {
      console.log(pagesHistory)
      navigate(pagesHistory[pagesHistory.length-1]);
    } else {
      
      if (spet === 1){
        mainRef.current.classList.remove('stepOne')
        mainRef.current.classList.remove('stepTwo')
        mainRef.current.classList.add('oneBack')
      }
      if (spet === 2){
        mainRef.current.classList.remove('stepTwo')
        mainRef.current.classList.remove('stepOne')
        mainRef.current.classList.add('twoBack')
      }
      spet -= 1;
      MainButton.setText("ДАЛЕЕ")
      // backAnimte();

    }
  }

  const GreyIntWidth = useMemo(() => {
    return (document.documentElement.clientWidth - 36) / 2;
  }, []);
  const GreyWidth = useMemo(() => {
    return GreyIntWidth.toString() + "px";
  }, [GreyIntWidth]);

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
    MainButton.setText("ДАЛЕЕ");



    return () => {
      MainButton.hide();
    };
  }, []);
  
  const twoPages = useMemo( () => {
    return (
      {
        ton: error.ton,
        singleError: error.singleError,
        startError: error.startError,
        endError: error.endError,
      }
    )
  } , [error] )
  return (
    <motion.div
      ref={mainRef}
      className="AdCreating__container"
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
            setTaskInformation={setFirstPage}
            taskInformation={firstPage}
            MyInformation={false}
            mistakes={{ timeError: false, taskName: false }}
            categorys={categorys}
            subCategorys={subCategorys}
          />
          <AdCreatingTwo
            errors={twoPages}
            GreyIntWidth={GreyIntWidth}
            GreyWidth={GreyWidth}
            setTaskInformation={setSecondPage}
            taskInformation={secondPage}
            tonConstant={tonConstant}
          />
          <FirstDetails  style = {{position : "static" , minWidth : "100vw", transform : "translateX(0%)"}} end = {true} orderInformation={{...firstPage , ...secondPage}} />
          {/* <AdCreatingThree taskInformation={secondPage} /> */}
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
