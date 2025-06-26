import  { useEffect, useMemo, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useSelector } from "react-redux";
import "./MyAds.css";
import MyAdOne from "./components/MyAdOne";
import axios from "axios";
import pagesHistory from "../../constants/pagesHistory";
import { USERID } from "../../constants/tgStatic.config";
import useBlockInputs from "../../hooks/useBlockInputs";
import useNavigateBack from "../../hooks/useNavigateBack";
import MainButton from "../../constants/MainButton";
import menuController from "../../functions/menuController";


const MyAds = () => {

  const [valueOne , setValueOne] = useState("all")

  const [valueTwo , setValueTwo] = useState("all")

  const responsesArr = useSelector((state) => state.responses.responses)

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


  const myAdsArray = useSelector((state) => state.information.myAdsArray);

  useEffect( () => {
    menuController.showMenu();
    menuController.raiseMenu();
  }, [] )


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

  const [nowValue , setNowKey] = useState("customer")

  useEffect( () => {
    
    const more = async () => {
      const imTwo = await axios.get(
        `${process.env.REACT_APP_HOST}/advertisement/findCount`,
        {
          params: {
            userId: USERID,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      const imOne = await axios.get(
        `${process.env.REACT_APP_HOST}/response/findCount`,
        {
          params: {
            userId: USERID,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      const advertisemetCount = imTwo.data
      const responseCount = imOne.data
      if (pagesHistory[pagesHistory.length - 1] === "/AdCreating"){
        setNowKey("customer")
      }
      else{
        if (advertisemetCount < responseCount){
          setNowKey("freelancer")
        
        }
        else{
          setNowKey("customer")
        }
      }
    }
    more()
  
  } , [] )


  useNavigateBack({isSliderOpened : false, setSlideOpened : false});

  useBlockInputs();
  
  useEffect( () => {
    MainButton.hide();
  }, [] )

  return (
    <>
        <div
          className="MyAdsContainer"
        >
          <MyAdOne
          responsesArr = {filteredResponses}
            setOneValue = {setValueOne}
            setTwoValue = {setValueTwo}
            nowValue={nowValue}
            valueTwo={valueTwo}
            valueOne = {valueOne}
            setNowKey={setNowKey}
            myAdsArray={filteredArray}
          />
        </div>
    </>
  );
};

export default MyAds;
