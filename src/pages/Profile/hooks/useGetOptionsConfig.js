import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../../store/information";
import { useMemo } from "react";

const useGetOptionsConfig = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const me = useSelector(state => state.telegramUserInfo);
    const baidgeOptionsConfig = useMemo( () => {
        return (
                  [
            {
                isActive : true,
                imgPath : "/images/newProfile/baidge-icon.svg",
                text : "Бэйдж исполнителя",
                isNeededFill : !userInfo.profession,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    if (userInfo.profession){
                        dispatch(setUser(me));
                        navigate("/Baidge")
                    }
                    else{
                        navigate("/BaidgeCreating")
                    }
                },
                numberNearToArrow : null
            },
            {
                isActive : true,
                imgPath : "/images/newProfile/example-of-works-icon.svg",
                text : "Примеры работ",
                isNeededFill : userInfo.profile.cards.length === 0  ,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    dispatch(setUser(userInfo));
                    navigate('/cardsPage')},
                numberNearToArrow : null
            },
            {
                isActive : false,
                imgPath : "/images/newProfile/template-of-responses-icon.svg",
                text : "Шаблоны откликов",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    window.Telegram.WebApp
                    .showPopup({
                    title: "⏳Скоро доступно",
                    message: "Эта функция появится в одном из ближайших обновлений. Мы уже работаем над её запуском — следите за новостями!",
                    buttons: [
                        { id: "save", type: "default", text: "Понятно" },
                    ],
                    } , (buttonId) => {    
                    } )
                },
                numberNearToArrow : null
            }
        ]
        )
    } , [me, navigate, dispatch, userInfo])

    return baidgeOptionsConfig;
};

export default useGetOptionsConfig;