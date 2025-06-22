import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserWithoutCards } from "../../../functions/api/getUserWithoutCards";
import { useParams } from "react-router";
import { fetchFeedBacksByUserId } from "../../../functions/api/fetchFeedbacksByUserId";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import NoFeedbacks from "./components/NoFeedbacks";
import menuController from "../../../functions/menuController";
import NoFeedbacksForMe from "./components/NoFeedbacksForMe";

const Feedbacks = () => {
    const {userId} = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const me = useSelector( (state) => state.telegramUserInfo );
    const userConfig = useSelector( (state) => state.information.baidgeUser );
    
    const fetchUserWithFeedbacks = useCallback( async () => {
        const user = await getUserWithoutCards(userId);
        const feedbacks = await fetchFeedBacksByUserId(userId);
        setUserInfo({...user, feedbacks});
    }, [userId] )
    console.log(userConfig);
    console.log(userInfo);
    useEffect( () => {
        if (!userConfig){
            fetchUserWithFeedbacks();
        }
        else{
            setUserInfo(userConfig);
        }
    }, [userConfig, setUserInfo, fetchUserWithFeedbacks] );

    useEffect( () => {
        menuController.hideMenu();
    } , [])


    if (!userInfo){
        return <MyLoader />
    }
    if (!userInfo.feedbacks){
        return <MyLoader />
    }
    if (userInfo.feedbacks.length === 0){
        if (userInfo.id === me.id)
            return <NoFeedbacksForMe />
        return <NoFeedbacks />
    }
    return (
        <div>
            
        </div>
    );
};

export default Feedbacks;