import React, { useCallback, useEffect, useMemo, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMenuActive } from "../../store/menuSlice";
import useListner from "../../hooks/useListner";
import "./MyAds.css";

import { motion } from "framer-motion";
import LastAds from "./components/LastAds";
import MyAdOne from "./components/MyAdOne";
import AboutReaction from "./components/AboutReaction";
import AboutOne from "./components/AboutOne";
import { CSSTransition } from "react-transition-group";
import sortFiles from "../../functions/sortFiles";
import { putMyTask } from "../../store/information";
import AdCreatingOne from "../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { useButton } from "../../hooks/MyAds/useButton";
import { useSave } from "../../hooks/MyAds/useSave";
import ShowMyResponse from "../../components/MyAds/ShowMyResponse/ShowMyResponse";
import FirstDetails from "../../components/First/FirstDetails/FirstDetails";
import { deleteResponse } from "../../store/responses";
import MyLastAds from "./components/MyLastAds";
import CardPage from "../CardPage/CardPage";
import makeNewFile from "../../functions/newMakeFile";
import axios from "axios";

// const LastAds = lazy( () => import ("./components/LastAds") )
// const MyAdOne = lazy( () => import ("./components/MyAdOne") )
// const AboutOne = lazy( () => import ("./components/AboutOne") )
// const AboutReaction = lazy( () => import ("./components/AboutReaction") )


let localAboutReaction;
let localSecondPage;
let localIsOpen;
let localDetails;
let detailsVar;


// const advertisementId = window.Telegram.WebApp.initDataUnsafe.start_param.split("m")[0]
// const responseId = window.Telegram.WebApp.initDataUnsafe.start_param.split("m")[1]

let advertisementId = 1
let responseId = 1

const defaultDate = new Date()




const MyAds = ({isPage = false}) => {


  const [isPageValueOne , setPageValueOne] = useState(true)
  const [isPageValueTwo , setPageValueTwo] = useState(true)
  useEffect( () => {
    if (isPage){
      let url = new URL(window.location.href);
      advertisementId = url.searchParams.get("advertisemet")
      responseId = url.searchParams.get("response")
    }
  } , [isPage] )
  alert(advertisementId)
  alert(responseId)
  
  const [valueOne , setValueOne] = useState("all")

  const [valueTwo , setValueTwo] = useState("all")



  const responsesArr = useSelector((state) => state.responses.responses);

  const sortedResponses = useMemo( () => {
    let copy = [...responsesArr]
      return copy.sort((a,b) => {
        let order = {"inProcess" : 1 , "watched" : 2 , "" : 3, "completed" : 4}
        return order[a.isWatched] - order[b.isWatched]
      })
  } , [responsesArr] )

  const filteredResponses = useMemo( () => {
    switch (valueOne){
      case "all":
        return sortedResponses
      case "inProcess":
        return sortedResponses.filter(e => e.isWatched === "inProcess")
      case "watched": 
        return sortedResponses.filter(e => e.isWatched === "watched")
      case "unWatched":
        return sortedResponses.filter(e => e.isWatched === "")
      case "completed":
        return sortedResponses.filter(e => e.isWatched === "completed")
      default : 
        window.Telegram.WebApp.showAlert("Что - то пошло не так MyAds")
    }
  } , [sortedResponses , valueOne]  )




  const isMenuActive = useSelector((state) => state.menu.value);
  const dispatch = useDispatch()

  const setMenuActive = useCallback(
    (arg) => {
      dispatch(changeMenuActive(arg));
    },
    [dispatch]
  );
  


  const [details, setDetails] = useState({
    isActive: false,
    task: {
      id: "",
      taskName: "",
      taskDescription: "",
      deadline: 1,
      category: 1,
      subCategory: 1,
      price: 2000,
      time: { start: "", end: "" },
      photos: [],
      photosNames: [],
    },
  });

  detailsVar = details;


  
  
  const myAdsArray = useSelector((state) => state.information.myAdsArray);

  const filteredArray = useMemo( () => {
    switch (valueTwo){
      case "all":
        return myAdsArray
      case "active":
        return myAdsArray.filter((e, i) => {
          return e.status === "active"
        })
      case "inProcess":
        return myAdsArray.filter(e => e.status === "inProcess")
      case "completed":
        return myAdsArray.filter(e => e.status === "completed")
      default : 
        window.Telegram.WebApp.showAlert("Что - то пошло не так MyAds второй")
    }
  } , [myAdsArray , valueTwo] )


  
  const [secondPage, setSecondPage] = useState({
    isActive : false,
    task : myAdsArray[0],
    index : 0
  }
  );
  const [openAboutReaction, setOpenAboutReaction] = useState({
    isActive : false,
    responce : null
  });

  const [oneCards, setOneCard] = useState({
    isOpen : false,
    card : {}
  })


  useEffect( () => {
    if (isPage){
      setSecondPage((value) => ({...value , isActive : true}))
      setOpen((value) => ({...value, isActive : true}))
    }
  } , [isPage] )


  function checkMistakes(changingTask) {
    let taskName = false;
    let timeError = false;
    let descriptionError = false;
    if (changingTask.taskName.length < 5) {
      taskName = true;
    }

    if (changingTask.time.end.getTime() !== defaultDate.getTime()) {
      if (changingTask.time.end < changingTask.time.start) {
        timeError = true;
        window.Telegram.WebApp.showAlert("У вас дата начала меньше даты завершения.")
      }
    }
    if (changingTask.taskDescription.length > 500){
      descriptionError = true
      window.Telegram.WebApp.showAlert("Описание больше 500 символов")
    }
    let rezult = { taskName: taskName, timeError: timeError, descriptionError : descriptionError };


    setMistakes(rezult);
    return Object.values(rezult).every((value) => value === false);
  } 



  const [isOpen, setOpen] = useState({ isActive: false, responce: {
    information: "",
    photos: [],
    user: {
        id: 0,
        fl: "",
        photo: "",
        about: "",
        stage: null,
    }
  } });

  localAboutReaction = openAboutReaction;
  localIsOpen = isOpen;
  localSecondPage = secondPage;
  localDetails = details





  const navigate = useNavigate();

  const save = useSave({
    detailsVar,
    myAdsArray : filteredArray,
    secondPage,
    checkMistakes,
    sortFiles,
    dispatch,
    putMyTask,
    setDetails,
    details
  })// функция сохранения , а также модалка телеграма



  const [myResponse, setMyResponse] = useState({
    isOpen: false,
    id: 0,
  });
  const [detailsTwo, setDetailsTwo] = useState({
    isOpen : false,
    id : 0
  })

  const openDetails = useCallback( (index) => {
    setDetailsTwo({isOpen : true, id : index})
  } , [] )


  const [lastAdsTwo , setLastAdsTwo] = useState({
    isOpen : false,
    response : {},
  })


  useButton({
    setMyResponse : setMyResponse,
    myResponse : myResponse,
    setDetailsTwo : setDetailsTwo,
    detailsTwo : detailsTwo, 
    oneCards : oneCards,
    localDetails : localDetails,
    localAboutReaction : localAboutReaction,
    localIsOpen : localIsOpen,
    setOpen : setOpen,
    setSecondPage : setSecondPage,
    navigate : navigate,
    setOpenAboutReaction : setOpenAboutReaction,
    openAboutReaction : openAboutReaction,
    isOpen : isOpen,
    details : details,
    secondPage : secondPage,
    localSecondPage : localSecondPage,
    setDetails : setDetails,
    save : save,
    setOneCard : setOneCard,
    lastAdsTwo : lastAdsTwo,
    setLastAdsTwo : setLastAdsTwo
  })


  function setDetailsActive(value) {
    setDetails({ ...details, isActive: value });
  }

  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive: details.isActive,
  });


  const [mistakes, setMistakes] = useState({
    taskName: false,
    timeError: false,
  }); // контролер ошибок

  



  const setChangingTask = useCallback( (e) => {
    setDetails( (value) =>  ({...value , task : e}))
  }, [setDetails] ) 
  const [nowValue , setNowKey] = useState('customer')



  // const sortedArray = useMemo( () => {
  //   let copy = [...myAdsArray]

  //     return copy.sort( (a , b) => {
  //       let order = {"inProcess" : 0 , "active" : 1, "completed" : 2 }
  //       return order[a.status] - order[b.status]
  //     } )
    
  // } , [myAdsArray , nowValue] )



//   useEffect( () => {
//     document.documentElement.style.overflowY = 'scroll'
//     document.documentElement.style.marginTop = '40px'
//     setTimeout( () => {

//       window.scrollTo({
//         top: 40,
//         behavior: "smooth",
//       });
//        document.documentElement.style.overflowY = 'hidden'
//     }, 350 )

// },[] )

  


  


  const [myAdeOneStatus , setMyAdOneStatus] = useState(null)
  const [pageResponseStatus , setPageResponseStatus] = useState(null)



  

  const myAdOneResponse = useMemo( () => {
    async function getResponse() {
      let responce;
      try{

      
      let im = await axios.get(
        "https://back-birga.ywa.su/response/findOne",
        {
          params: {
            id: responseId,
          },
        }
      );
      let responce = im.data;
        let photos = [];

        if (responce.photos) {
          photos = await makeNewFile(responce.folder, responce.photos);
        }

        let b = await axios.get("https://back-birga.ywa.su/card/countByUser" , {
            params : {
                advertisementId: responce.user.id,
            }
        } )

        responce.photos = photos;
        responce.advertisement = myAdeOneStatus
        console.log(responce)
        responce.user.cardsNumber = b.data
        
        console.log(responce)
        try {
          // let imTwo = await axios.get(
          //   "https://back-birga.ywa.su/advertisement/findCount",
          //   {
          //     params: {
          //       userId: Number(responce.user.id),
          //     },
          //   }
          // );
          // responce.createNumber = imTwo.data;
        } catch (e) {
           console.log(e)
          // window.Telegram.WebApp.showAlert(e);
        }



        return responce;

      }
      catch(e){
        window.Telegram.WebApp.showAlert("Этот отклик был удален.")
        setPageValueOne(false)
        setPageValueTwo(false)
        console.log(e)
      }
      


    }
    if (isPage && isPageValueTwo){
      if (myAdeOneStatus === null || !myAdeOneStatus){
        return null
      }
      else{
        if (pageResponseStatus === null ){
          getResponse().then((value) => {setPageResponseStatus(value)})
          return null
        }
        else{
          return pageResponseStatus
        }
      }
    }
    else{
      return isOpen.responce
    }
  } , [myAdeOneStatus, pageResponseStatus , isOpen.responce  , isPage, isPageValueTwo] )

  const myAdOneAdvertisement = useMemo( () => {
    
    async function getAdvertisement() {
      try{

        let im = await axios.get("https://back-birga.ywa.su/advertisement/findOne" , {
          params : {
            id : advertisementId
          }
        })
        let order = im.data
        let files = await makeNewFile(order.folder, order.photos);
        let responseCounter = await axios.get("https://back-birga.ywa.su/response/countByAdvertisement" , {
          params : {
            "advertisementId" : order.id
          }
        })
        return {
          id: order.id,
          taskName: order.title,
          executionPlace: "Можно выполнить удаленно",
          time: {
            start: new Date(order.startTime),
            end: new Date(order.endTime),
          },
          tonValue: order.price,
          taskDescription: order.description,
          photos: files,
          photosNames: order.photos,
          rate: "5",
          isActive: true,
          creationTime: order.createdAt,
          viewsNumber: order.views,
          removedFiles: [],
          addedFiles: [],
          status: order.status,
          user : order.user,
          responseCounter : responseCounter.data,
          category : order.category.id
        };
      }
      catch(e){
        window.Telegram.WebApp.showAlert("Вы удалили уже это задание.")
        setPageValueOne(false)
        setPageValueTwo(false)
        console.log(e)
      }
    }

    if (isPage && isPageValueOne){
      if (myAdeOneStatus === null){
        getAdvertisement().then((value) => {
          console.log(value)
          setMyAdOneStatus(value)})
        return null
      }
      else{
        return myAdeOneStatus
      }
    }
    else{
      return filteredArray[secondPage.index]
    }
  } , [isPage , myAdeOneStatus  , secondPage.index , filteredArray , isPageValueOne] )




  const deleteFunction = useCallback( (index) => {
    window.Telegram.WebApp
    .showPopup({
      title: "Удалить?",
      message: `Вы уверены, что хотите удалить этот отклик?`,
      buttons: [
        { id: "save", type: "default", text: "Да" },
        { id: "delete", type: "destructive", text: "Нет" },
      ],
    } , (buttonId) => {

      if (buttonId === "delete" || buttonId === null) {
        
      }
      if (buttonId === "save") {
        setMyResponse((value) => ({...value , isOpen : false}))
        dispatch(deleteResponse(index))
      }


    } )

} , [setMyResponse , dispatch])





  return (
    <>
      {myAdsArray[0] === null ? (
        <></>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="MyAdsContainer"
        >



          <MyAdOne
          responsesArr = {filteredResponses}
          myResponse = {myResponse}
          setMyResponse = {setMyResponse}
          details = {detailsTwo}
            setOneValue = {setValueOne}
            setTwoValue = {setValueTwo}
            nowValue={nowValue}
            valueTwo={valueTwo}
            valueOne = {valueOne}
            setNowKey={setNowKey}
            myAdsArray={filteredArray}
            setSecondPage={setSecondPage}
            setDetails={setDetailsTwo}
            setMenuActive={setMenuActive}
          />





        <CSSTransition classNames="details" in={details.isActive} timeout={300}
          mountOnEnter unmountOnExit>
            <AdCreatingOne
              mistakes={mistakes}
              className="AdCreatingMy"
              taskInformation={details.task}
              setTaskInformation={setChangingTask}
              MyInformation={true}
              isDetailsActive={details.isActive}
            />
          </CSSTransition>

          <CSSTransition
            classNames="aboutOne"
            in={(secondPage.isActive && myAdOneAdvertisement !== null)}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <AboutOne
            style = { (isPageValueOne && isPage) ? {left : "0px"} : {}}
            setDetails={setDetails}
              setSecondPage={setSecondPage}
              setOpen={setOpen}
              task={myAdOneAdvertisement}
              setMenuActive={setMenuActive}
              openAboutReactionFunc={setOpenAboutReaction}
            />
          </CSSTransition>



          <CSSTransition
            classNames="left-right"
           
            in={isOpen.isActive && myAdOneResponse !== null && myAdOneResponse}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <LastAds
             style = { (isPageValueTwo && isPage) ? {left : "0px"} : {}}
            responce = {myAdOneResponse}
              openAboutReactionFunc={setOpenAboutReaction}

            />
          </CSSTransition>


          <CSSTransition
            classNames="left-right"
            in={lastAdsTwo.isOpen}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <MyLastAds
            responce = {lastAdsTwo.response}
              openAboutReactionFunc={setOpenAboutReaction}

            />
          </CSSTransition>



          <CSSTransition
            classNames="left-right"
            in={openAboutReaction.isActive}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <AboutReaction setOneCard = {setOneCard} responce = {openAboutReaction.responce}   />
          </CSSTransition>

          <CSSTransition
            classNames="left-right"
            in={oneCards.isOpen }
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
           <CardPage card={oneCards.card} />
      </CSSTransition>


          <CSSTransition
        in={myResponse.isOpen}
        timeout={400}
        classNames={"left-right"}
        unmountOnExit
        mountOnEnter
  
      > 
        <ShowMyResponse openAboutReaction = {setOpenAboutReaction} setLastAds = {setLastAdsTwo} deleteFunction = {deleteFunction}  index={myResponse.id} openDetails = {openDetails} response={filteredResponses[myResponse.id]} />
      </CSSTransition>


      <CSSTransition
            in={detailsTwo.isOpen}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
          >
            <FirstDetails
              // className={}
              orderInformation={filteredResponses[detailsTwo.id] ? filteredResponses[detailsTwo.id].advertisement : ""  }

            />
        </CSSTransition>




        </motion.div>
      )}
    </>
  );
};

export default MyAds;
