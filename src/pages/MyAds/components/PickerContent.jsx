import React, { useCallback } from 'react';

import FirstBlock from '../../../components/First/FirstMain/FirstBlock';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import { useDispatch } from 'react-redux';
import { deleteAd } from '../../../store/information';
import axios from 'axios';
const PickerContent = ({myAdsArray  , setSecondPage , setDetailsActive , setDetails, dispatch}) => {


    const deleteFunction = useCallback( (e) => {
      window.Telegram.WebApp
      .showPopup({
        title: "Удалить?",
        message: "Вы хотите удалить это задание?",
        buttons: [
          { id: "save", type: "default", text: "Да" },
          { id: "delete", type: "destructive", text: "Нет" },
        ],
      } , (buttonId) => {
  
        if (buttonId === "delete" || buttonId === null) {
          
        }
        if (buttonId === "save") {
          dispatch(deleteAd(e.id))
        }
  
  
      } )
    }, [dispatch] )

    return (
    <div className="PickerContent">
        <div className="picler__block">

          <AdCreateFunc text={"Создать объявление"} link={'/AdCreating'} />
          {/* <Link to="/AdCreating" className="AdCreactingFunction">
            <img src={plus} alt="" />
            <p>Создать объявление</p>
          </Link> */}
          <div className="AdsContainer">
            {myAdsArray.map((e, i) => {
              return (
                <div key={i}
                  className="block"
                  onClick={(p) => {
                    if (p.target.closest('.FirstMain__bottom-right') === null){
                      //  setTask(e);
                      setSecondPage({isActive : true , task : e});
                    }
                  }}
                >
                  <FirstBlock
                  isMyAds={true}
                  deleteFunction={() => {
                    deleteFunction(e)
                  }}
                    key={i}
                    isButton={true}
                    setDetailsActive={() => {
                      setDetails({
                        isActive : true,
                        task : myAdsArray[i],
                        index : i
                      })
                      

                    }}
                    {...e}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default PickerContent;