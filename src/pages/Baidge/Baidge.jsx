import { useCallback, useEffect, useRef } from "react";
import {useDispatch, useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import BaidgeWithProfile from "./components/BaidgeWithProfile";
import BaidgeWithoutProfile from "./components/BaidgeWithoutProfile";
import { useParams } from "react-router";
import { findUserById } from "../../functions/api/findUserById";
import menuController from "../../functions/menuController";
import MainButton from "../../constants/MainButton";
import { putUserInfo } from "../../store/telegramUserInfo/thunks/putUserInfo";
import { setUser } from "../../store/information";

const baidgeId =  window.Telegram.WebApp.initDataUnsafe?.start_param || null
const Baidge = ({isExternal = false}) => {

  const me = useSelector((state) => state.telegramUserInfo);

  const {id} = useParams();

  const dispatch = useDispatch();

  const userInfo = useSelector( (state) => state.information.baidgeUser );

    console.log(me, userInfo)

  const setUserInfo = useCallback( (user) => {
    dispatch(setUser(user))
  }, [dispatch] )

  useEffect( () => {
    menuController.showMenu();
    menuController.raiseMenu();
  }, [] );

  const isUserFetched = useRef(false);

  useEffect(() => {
    if (!isUserFetched.current && me.id && !userInfo){ // Если прогружен пользователь приложения и еще не было загрузки обладателя бейджа
      if (isExternal){ // бейдж переслан через ссылку
        if (String(baidgeId) === String(me.id)){
          setUserInfo(me);
        }
        else{
          findUserById(baidgeId).then( (user) => {setUserInfo(user)} ).catch( () => {
            alert("Не удалось найти пользователя с id = " + baidgeId)
          } )
        }
      }
      else{
        if (String(id) !== me.id && id) { // если не будет id значит бейдж точно пользователя webApp
          findUserById(id).then( (user) => {setUserInfo(user)
            console.warn(user);
          } ).catch( (err) => {
            console.error(err);
            alert("Не удалось прогрузить бейдж пользователя.")
          } )
        } else {
          setUserInfo(me);
        }
      }
        isUserFetched.current=true; // загрузка обладателя бейджа была завешена
    }
  }, [me, id, isExternal, userInfo, setUserInfo]);

  useEffect( () => { 
    MainButton.hide();
  }, [] )

  const addWatch = useCallback( async () => {
    if (userInfo){
      dispatch(putUserInfo([{
        views : userInfo.views + 1
      }, userInfo.id]))
    }
  }, [dispatch, userInfo] )

  useEffect( () => {
    if (userInfo && userInfo.id && me.id ){
      if (userInfo.id !== me.id){
        addWatch();
      }
    }
  } , [userInfo, me, addWatch]);

  console.log(userInfo);
  if (!userInfo || userInfo.id === null) {
    return <MyLoader />;
  }
  return (
    <>
      {userInfo.profession ? (
        <BaidgeWithProfile
          urlParametr={id}
          setUserInfo={setUserInfo}
          userInfo={userInfo.id === me.id ? me : userInfo}
        />
      ) : (
        <BaidgeWithoutProfile setUserInfo = {setUserInfo} userInfo={userInfo} />
      )}
    </>
  );
};

export default Baidge;
