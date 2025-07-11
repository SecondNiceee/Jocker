import { useCallback } from 'react';
import cl from './Customer.module.css'
import MyButton from '../../UI/MyButton/MyButton';
import Text from '../../Text/Text';
import translation from '../../../functions/translate';
import useGetUserPhotoLink from '../../../hooks/useGetUserPhotoLink';
const Customer = ({fl , photo, link, id, onImageClick}) => {

    const openTelegrmaLink = useCallback( () => {
        if (link && link !== '-1' ){
              window.Telegram.WebApp.openTelegramLink(
                  "https://t.me/" + link
                );
        }
        else{
            window.Telegram.WebApp
            .showPopup({
              title: translation("Упс"),
              message: "Похоже, у пользователя закрытый профиль",
              buttons: [
                { id: "save", type: "default", text: "Понятно" },
              ],
            } , (buttonId) => {
        
              if (buttonId === "save" || buttonId === null) {
                
 
              }
            } )
        }

} , [link] )

    const imgSrc = useGetUserPhotoLink({anotherUserInfo : {photo}})
    return (
        <div className={cl.wrapper}>
            <img style={{
                objectFit : "cover"
            }} onClick={onImageClick}  className={`${cl.userPhoto} object-cover`} src={imgSrc} alt="" />
            <div onClick={onImageClick} className={cl.two}>
                <Text>{fl}</Text>
                <Text>Заказчик</Text>
            </div>
            <MyButton hard = {true} onClick = {openTelegrmaLink}  style = {{marginLeft : "auto"}}>
                НАПИСАТЬ
            </MyButton>
        </div>
    );
};

export default Customer;