import React, { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";
import { deleteAd } from "../../../store/information";
import { useDispatch, useSelector } from "react-redux";
import AllReactions from "./AllReactions";
import Block from "../../../components/First/Block";
import { clearResponsesByA, fetchResponseByAdvertisement } from "../../../store/responses";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import translation from "../../../functions/translate";




const Yes = translation("Yes")
const No = translation("No")
const AboutOne = ({
  task,
  setMenuActive,
  setOpen,
  setSecondPage,
  setDetails,
  openAboutReactionFunc,
  ...props
}) => {
  const responces = useSelector( state => state.responses.responsesByA )
  const dispatch = useDispatch();
  useEffect(() => {
    if (task){
      dispatch(clearResponsesByA())
      dispatch(fetchResponseByAdvertisement([task.id, task , 1]))
    }
    // eslint-disable-next-line
  }, [task]);

  const deleteFunction = useCallback(
    (e) => {
      window.Telegram.WebApp.showPopup(
        {
          title: "Удалить?",
          message: "Вы хотите удалить это задание?",
          buttons: [
            { id: "save", type: "default", text: Yes },
            { id: "delete", type: "destructive", text: No },
          ],
        },
        (buttonId) => {
          if (buttonId === "delete" || buttonId === null) {
          }
          if (buttonId === "save") {
            console.log(e)
            dispatch(deleteAd(e.id));
            setSecondPage((value) => ({ ...value, isActive: false }));
          }
        }
      );
    },
    [dispatch, setSecondPage]
  );

  const [filterBy, setFilterBy] = useState("all");

  const filteredArray = useMemo(() => {
    if (responces !== null) {
      if (filterBy === "all"){
        return responces
      }
      if (filterBy === "withCompletedTasks"){
        return [...responces.filter(e => e.user.completedAdvertisements.length > 0)]
      }
      if (filterBy === "withCards"){
        return [...responces.filter(e => e.user.cardsNumber > 0)]
      }
    }
    else{
      return [];
    }
  }, [responces, filterBy]);

  const deleteCallback = useCallback(() => {
    deleteFunction(task);
    // eslint-disable-next-line
  }, [task]);

  const setDetailsCallback = useCallback(() => {
    setDetails({
      isActive: true,
      task: {...task, myAds : true},
    });
    // eslint-disable-next-line
  }, [task]);


  const getMore = useCallback( (page, setPage) => {
    dispatch(fetchResponseByAdvertisement([task.id , task , page]));
    setPage(page + 1);
  } , [dispatch, task] )


  const putStatus = useSelector( state => state.information.putTaskStatus )
  return (
    <>


    <div className="aboutOne" {...props} >

      {task && (putStatus !== "pending")  ? (
        <Block
          deleteFunction={deleteCallback}
          setDetailsActive={setDetailsCallback}
          isResponce={task.status !== "inProcess" }
          isButton={task.status !== "inProcess" }
          className={"FirstAdsBlock"}
        
          {...task}
        />
      ) : (
        <MyLoader style = {{transform : "translateX(-16px)" , height : "250px" }} />
      )}


        <AllReactions
          getMore = {getMore}
          filteredArray={filteredArray}
          setFilterBy={setFilterBy}
          openAboutReactionFunc={openAboutReactionFunc}
          setOpen={setOpen}
        />
      

    </div>
    
    </>
  );
};

export default memo(AboutOne);
