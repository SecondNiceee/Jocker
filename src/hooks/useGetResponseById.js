import { useEffect, useRef } from 'react';
import getResponseById from '../functions/api/getResponseById';
import { findUserById } from '../functions/api/findUserById';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAdditionalUserInfo } from '../store/telegramUserInfo/thunks/fetchAdditionalUserInfo';
import { setResponse } from '../store/information';
import { fetchAdditionalUserInfo } from '../functions/api/fetchAdditionalUserInfo';
import { getUserWithoutCards } from '../functions/api/getUserWithoutCards';

const useGetResponseById = ({id}) => {
    const responseFromStore = useSelector( (state) => state.information.response )
    const me = useSelector(state => state.telegramUserInfo);
    const dispatch = useDispatch();
    const isLoadResponse = useRef(false);
    useEffect( () => {
        async function getResponseWithUser() {
            const response = await getResponseById(id);
            if (String(response.user.id) === String(me.id)){
                if (me.profession){
                    if (!me.commonRating || !me.ratingByProfession){
                        alert("")
                        dispatch(fetchMyAdditionalUserInfo({
                            isCommonRating : true,
                            isRatingByProfession : true
                        }))
                        dispatch(setResponse(response));
                    }
                    else{
                        dispatch(setResponse({...response, user : me}))
                        isLoadResponse.current = true
                    }
                }
                else{
                    // alert("")
                    dispatch(setResponse({...response, user : me}))
                    isLoadResponse.current = true;
                }
            }
            else{
                const userWithoutRating = await findUserById(response.user.id);
                const {commonRating, ratingByProfession} = await fetchAdditionalUserInfo({isCommonRating : true, isRatingByProfession : true}, userWithoutRating)
                dispatch(setResponse({...response, user : {...userWithoutRating, commonRating, ratingByProfession}}))
            }
        }

        if (!isLoadResponse.current){
            if (responseFromStore){
                if (responseFromStore.user.profession && !responseFromStore.user.commonRating && !responseFromStore.user.ratingByProfession){
                    if (responseFromStore.user.id === me.id){
                        if ((!me.commonRating || !me.ratingByProfession)){
                            if (me.additionalInfoStatus !== "pending"){
                                dispatch(fetchMyAdditionalUserInfo());
                            }
                        }
                        else{
                            alert("")
                            dispatch(setResponse( {...responseFromStore, user : me} ))
                            isLoadResponse.current = true;
                        }
                    }
                    else{
                        const {commonRating, ratingByProfession} = fetchAdditionalUserInfo({isCommonRating : true, isRatingByProfession : true}, responseFromStore.user)
                        dispatch(setResponse({...responseFromStore, user : {...responseFromStore.user, commonRating, ratingByProfession}}))
                        isLoadResponse.current =true;
                    }
                }
                else{
                    if (!responseFromStore.user.profession){
                        if (responseFromStore.user.id === me.id){
                            dispatch(setResponse({...responseFromStore, user:me}))
                            isLoadResponse.current = true;
                        }
                        else{
                            getUserWithoutCards(responseFromStore.user.id).then((user) => {
                                dispatch(setResponse({...responseFromStore, user}))
                                isLoadResponse = true
                            }).catch( (err) => {
                                console.warn(err);
                                isLoadResponse = true
                            } )
                        }
                    }
                }
            }
            else{
                getResponseWithUser()
            }
        }
    }, [id, responseFromStore, me, dispatch] )

    return { responseFromStore};

};

export default useGetResponseById;