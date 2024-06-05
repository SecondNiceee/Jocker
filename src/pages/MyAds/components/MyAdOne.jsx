import React, { useState , memo, useEffect, useMemo} from "react";
import Burger from "../../../components/UI/Burger/Burger";
import MyAdsBlock from "./MyAdsBlock";
import PickerContent from "./PickerContent";
import AdCreatingOne from "../../AdCreatingOne/AdCreatingOne/AdCreatingOne";
import { CSSTransition } from "react-transition-group";
import Top from "./Top";
import BackButton from "../../../constants/BackButton";


const MyAdOne = ({
  myAdsArray,
  setTask,
  goForward,
  setDetailsActive,
  setMyAdsArray,
  isDetailsActive,
  setMenuActive, 
  changingTask,
  setChangingTask
}) => {

  


  
  const [index, setIndex] = useState(0);
  const [mistakes, setMistakes] = useState({
    taskName : false,
    timeError : false
  })
  
  useMemo(() => {
    if (isDetailsActive){
      BackButton.show()
      setChangingTask(myAdsArray[index])
      BackButton.onClick(save)
    }
    else{
      BackButton.hide()
      BackButton.offClick(save)
    }
  }, )
  console.log(changingTask)


  function checkMistakes(){
    alert('Вызов функции save')
    let taskName = false 
    let timeError = false
    console.log('changing Task : ' + changingTask)
    console.log(changingTask)
    console.log(taskName)
    console.log(timeError)
  
      if (changingTask.taskName.length < 5){
         taskName = true
      }

      if (changingTask.time.end.length > 0) {
        if (changingTask.time.end < changingTask.time.start){
          timeError = true
        }
      }
      let rezult = {taskName : taskName, timeError : timeError}

      console.log(taskName)
      console.log(timeError)

      setMistakes(rezult)
      return (Object.values(rezult).every(value => value === false))
  }

  function save() {

        if (changingTask !== myAdsArray[index]){
          if ( checkMistakes() ) {
            alert('ошибок нет')
            setDetailsActive(false)
          }
        }
      
  }
  
    function setMyArray(par) {
        console.log(par);
        setMyAdsArray(
          [...myAdsArray].map((e, i) => {
            if (i === index) {
              return par;
            }
            return e;
          })
        );
        console.log(myAdsArray);
      }
  return (
    <div className="my-ad-one">
      <Top name={'Мои задания'} setMenuActive={setMenuActive}/>
      <button style={{
        position : 'absolute',
        zIndex : '999'
      }} onClick={() => {
        save()
      }}>Save</button>
      <MyAdsBlock
        deals={1}
        finishedDeals={"70%"}
      />
      <PickerContent
        myAdsArray={myAdsArray}
        setTask={setTask}
        goForward={goForward}
        setDetailsActive={setDetailsActive}
        setIndex={setIndex}
      />

      <CSSTransition classNames="details" in={isDetailsActive} timeout={0} >
        <AdCreatingOne
          mistakes = {mistakes}
          className="AdCreatingMy"
          taskInformation={changingTask}
          setTaskInformation={setChangingTask}
          MyInformation={true}
        
        />
      </CSSTransition>
    </div>
  );
};

export default memo(MyAdOne);
