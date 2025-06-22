import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../../store/information";
import { useMemo } from "react";
const useGetBaidgeOprionsConfig = ({userInfo}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baidgeOptionsConfig = useMemo( () => {
    return (
        [
            {
                imgPath : "/images/Baidge/portfolioIcon.svg",
                text : "Портфолио",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    dispatch(setUser(userInfo))
                    navigate("/cardsPage")
                },
                numberNearToArrow : userInfo?.profile.cards.length
            },
            {
                imgPath : "/images/Baidge/StatisticIcon.svg",
                text : "Подробнее",
                isNeededFill : false,
                isNeededActiveTitle : false,
                clickFunc : () => {
                    dispatch(setUser(userInfo))
                    navigate("/statistik")
                },
                numberNearToArrow : null
            }
        ]
    );
    }, [navigate, dispatch, userInfo] )

    return baidgeOptionsConfig
};

export default useGetBaidgeOprionsConfig;