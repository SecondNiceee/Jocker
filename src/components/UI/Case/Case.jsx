import React, { memo, useCallback, useRef } from "react";
import cl from "./Case.module.css";
import { USERID } from "../../../constants/tgStatic.config";
import { useSliderClicker } from "../PhotosSlider/hooks/useSliderClicker";
import formateDateForTimeAgo from "../../../functions/formateDateForTimeAgo";


const Case = ({
  className,
  card,
  category,
  openFunc,
  task,
  title,
  description,
  photos,
  changeFunction,
  deleteFunction,
  watchOnly,
  agree = false,
  userId = USERID,
  setPhotos,
  setSliderOpened,
  setPhotoIndex,
  createdAt,
  ...props
}) => {
 const myRef = useRef(null)

  const vibrate = useCallback( () => {
      if (myRef.current){
          myRef.current.style.backgroundColor = "#3D4855"
      }
      setTimeout( () => {
          if (myRef.current){
              myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
          }
      } , 100 )
      // eslint-disable-next-line 
  }  , [])
  const clickHandler = useCallback( (e) => {
      if (myRef.current){
          myRef.current.style.backgroundColor = "#3D4855"
      }
      // eslint-disable-next-line 
  }  , [])
  const touchEnd = useCallback( (e) => {
      if (myRef.current){
          myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
      }
  }, [] )


  const photosClickEvent = useSliderClicker({photos, setPhotoIndex, setPhotos, setSlideOpened : setSliderOpened})


  return (

    <div ref={myRef}
      {...props}

      className={className ? [cl.case, className].join(" ") : cl.case}
    >

      <div onTouchEnd={ () => {
        if (watchOnly){
          touchEnd()
        }
      } }
      onTouchStart={() => {
        if (watchOnly){
          clickHandler()
        }
      }}
      onClick={() => {
        if (watchOnly){
          openFunc(card);
          vibrate()
        }
      }
      
    }  className={cl.area}>

      </div>
      {photos.length > 0 ? (
        <div className={cl.caseTop}>
          {photos.map((e, i) => {
            let url = e;
            return (
              <img
                onClick={photosClickEvent(i)}
                key={i}
                style={photos.length === 1 ? { minWidth: "100%" } : {}}
                src={url}
                alt=""
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}

      <div className="my-4 ml-[17px] mr-[19px] flex justify-between items-center"> 
          <div className="flex flex-col gap-[2px]">
            <p className="font-sf-pro-display font-medium text-[17px] leading-[18.33px] text-white">{title}</p>
            <p className="font-sf-pro-display-400 font-normal text-[14.67px] leading-[17.7px] text-[#B5CED9]">
              {formateDateForTimeAgo(createdAt)}
            </p>
          </div>
          <div onClick={openFunc} className="flex py-[6px] px-[13px] bg-telegram rounded-[14px] z-50">
            <p className="text-white font-sf-pro-display text-[15px] leading-4 tracking-[4%]">ОТКРЫТЬ</p>
          </div>
      </div>
    </div>
  );
};
export default memo(Case);
