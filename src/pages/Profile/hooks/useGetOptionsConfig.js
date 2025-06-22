import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../../store/information";

const useGetOptionsConfig = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        [
            {
                imgPath : "/images/newProfile/baidge-icon.svg",
                text : "Бэйдж исполнителя",
                isNeededFill : !userInfo.profession,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    if (userInfo.profession){
                        navigate("/Baidge")
                    }
                    else{
                        navigate("/BaidgeCreating")
                    }
                },
                numberNearToArrow : null
            },
            {
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
                imgPath : "/images/newProfile/template-of-responses-icon.svg",
                text : "Шаблоны откликов",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {navigate('/AllShablons')},
                numberNearToArrow : null
            }
        ]
    );
};

export default useGetOptionsConfig;