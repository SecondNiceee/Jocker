import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuActive } from '../../store/menuSlice';
import {Link, useLocation} from 'react-router-dom'
import Close from '../../components/UI/Close';
import Human from '../../components/UI/Human/Human'
import SmallDimond from '../../components/UI/SmallDimond/SmallDimond';
import userPhoto from "../../images/userPhoto/user.png"
import { color } from 'framer-motion';

const FirstMenu = () => {

    const dispatch = useDispatch()

    const isMenuActive = useSelector(state => state.menu.value)

    const setMenuActive = (set) => {
        dispatch(changeMenuActive(set))
    }
    const userInfo = useSelector(state => state.telegramUserInfo)





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





    const location = useLocation()

    return (
        <div className= {  isMenuActive ? 'FirstMenu'  :  'FirstMenu hidden'  }>

            <Close isMenuActive = {isMenuActive} setMenuActive = {setMenuActive}  />

            <Link onClick={() => {
                try{

                    setMenuActive(false)}
                catch(e){
                    window.Telegram.WebApp.showAlert(e)
                }
                } } to='/Profile' className="FirstMenu__top">
                
                <div>
                    <img className='icon' style={{objectFit : "cover"}} src= {userInfo.photo.length > 0 ? userInfo.photo : userPhoto} alt="" />
                </div>
                <div className="FirstMenu__top-right">
                    <p className='MenuName'>{userInfo.firstName}</p>
                    <div onClick={() => {setMenuActive(false)}} className='MenuProfile'>
                        <p className='MenuProfileLink'>Профиль</p>

                    </div>
                </div>
            </Link>

            <div ref={myRef} onTouchStart={clickHandler} onTouchEnd={touchEnd} onClick={() => {
                    vibrate()
                    window.Telegram.WebApp.showAlert("Мы скоро добавим.")
            }} className="MenuPrice">
                {/* <UpArr className= 'upArr' />  */}
                <p  className='MenuTextPrice'>Скоро</p>
                 <SmallDimond className= 'dymond' /> 
            </div>

            <div className='MenuList'>
                <Link style={location.pathname === "/AdCreating" ? {color : "white"} : {}} className='menuLink'  onClick={() => {setMenuActive(false)}}  to="/AdCreating" >Создать задание</Link>
                <Link style={location.pathname === "/" ? {color : "white"} : {}} onClick={ () => {setMenuActive(false)}} className='menuLink' to = '/'>Найти задания</Link>
                <Link style={location.pathname === "/MyAds" ? {color : "white"} : {}} onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/MyAds'>Мои задания</Link>
                <Link style={location.pathname === "/savedPage" ? {color : "white"} : {}} onClick={ () => {setMenuActive(false)}} className='menuLink'  to='/savedPage'>Избранное</Link>
                <p className='menuLink' onClick={() => {
                    window.Telegram.WebApp.openTelegramLink("https://t.me/connect_work_news")
                }} style={{
                    color : "#2ea5ff"
                }}  >Новости Коннект</p>
                {/* <p className='menuLink'   style={{color : 'rgb(42, 207, 88)'}}> Стать исполнителем </p> */}
            </div>

            <div className="Menu__Helps">
                <p className = 'menuHelp' onClick={() => {
                    window.Telegram.WebApp.openTelegramLink("https://t.me/connect_man")
                }}  >Поддержка 👋🏻</p>
               
            </div>

        </div>
    );
};

export default FirstMenu;

