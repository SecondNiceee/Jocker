import React from "react";
import upDown from "../../../images/icons/UpDown.svg";
import Reaction from './Reaction';
import axios from "axios";
const ReactionBlock = ({goForward , setOpen, responces }) => {

  return (
    <div className="reactions__block">

        <div className="reactions__top">
            <p className="sortBy">сортировка</p>
            <div className="reaction__choice">
            <p>по рейтингу</p>
            <img src={upDown} alt="" />
            </div>
        </div>

        {responces.map((e, i) => {
          return (
            <Reaction 

            name={e.user.fl}
            stage={e.user.stage}
            photos={e.photos}
            photo={e.user.photo}
             setOpen={() => {
              
                  setOpen({
                    isActive : true, 
                    responce : e
                  })              
            }} goForward = {goForward} /> 
          )
        })}
    </div>
  );
};

export default ReactionBlock;
