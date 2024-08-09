import React, { useCallback, useEffect, useRef } from 'react';
import classes from  "./MyButton.module.css"
const MyButton = ({ className, hard = false , children, ...props}) => {

    const myRef = useRef(null)
    const vibrate = useCallback( () => {
        // window.navigator.vibrate(100);
        myRef.current.style.backgroundColor = "#47A2E7"
        myRef.current.style.color = "#E6E6E7"
        setTimeout( () => {
        myRef.current.style.backgroundColor = "rgb(46, 165, 255)"
         myRef.current.style.color = "white"
        } , 100 )
    }  , [])
    const clickHandler = useCallback( (e) => {
        
        myRef.current.style.backgroundColor = "#47A2E7"
        myRef.current.style.color = "#E6E6E7"
        
    }  , [])
    const touchEnd = useCallback( (e) => {
        myRef.current.style.backgroundColor = "rgb(46, 165, 255)"
         myRef.current.style.color = "white"
    } , [] )
    const element = useRef(null)
    useEffect( () =>{
        function click(){
            if (hard){
                window.Telegram.WebApp.HapticFeedback.notificationOccurred('success')
            }
            else{
                window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
            }
        }
        if (element.current){
            element.current.addEventListener( "click" , click)
        }
    } , [hard] )
    return ( 
        <div ref={element} onClick={() => {
            vibrate()}} onTouchEnd={touchEnd} onTouchStart={clickHandler} {...props} >
            <button ref={myRef} className={ className ? [classes.MyButton, className].join(' ') : classes.MyButton } {...props}>{children}</button>
        </div>
    );
};

export default MyButton;