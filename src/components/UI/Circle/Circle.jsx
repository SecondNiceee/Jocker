import React, { useCallback, useRef } from 'react';
import cl from "./Circle.module.css"
const Circle = ( { children , ...props} ) => {
    const myRef = useRef(null)
    const vibrate = useCallback( () => {
        window.navigator.vibrate(100);
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
    return (
        <div {...props} ref={myRef} className={cl.circle}>
            <div onClick={vibrate} onTouchEnd={touchEnd} onTouchStart={clickHandler} className={cl.wrap}>
                {children}
            </div>
        </div>
    );
};

export default Circle;