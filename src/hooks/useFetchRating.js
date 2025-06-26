import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdditionalUserInfo } from "../functions/api/fetchAdditionalUserInfo";
import { fetchMyAdditionalUserInfo } from "../store/telegramUserInfo/thunks/fetchAdditionalUserInfo";

const useFetchRating = ({ isItMe, userInfo = {}, setUserInfo = () => {} }) => {
      const ratingLoaded = useRef(false);
      const me = useSelector((state) => state.telegramUserInfo);
      const dispatch = useDispatch();
      useEffect( () => {
          if (userInfo){
            if (!ratingLoaded.current){
              if (isItMe){
                dispatch(fetchMyAdditionalUserInfo({isCommonRating : !me.commonRating, isRatingByProfession : !me.ratingByProfession}));
              }
              else{
                  fetchAdditionalUserInfo({isCommonRating : !userInfo.commonRating, isRatingByProfession : !userInfo.ratingByProfession}, userInfo ).then( (info) => setUserInfo((value) => ({...value, ...info})) )
              }
            }
            ratingLoaded.current = true;
          }
    
      } , [userInfo, setUserInfo, me.id, me.commonRating, me.ratingByProfession,  isItMe,dispatch])
};

export default useFetchRating;
