import { USERID } from "../../../constants/tgStatic.config";
import { apiLikes } from "../../../functions/api/ApiLikes";
import { dislikeUser } from "../../../store/telegramUserInfo/thunks/dislikeUser";
import { likeUser } from "../../../store/telegramUserInfo/thunks/likeUser";


class LikesController{

    async likeUser({likedUserId, dispatch, user, setGotenUserInfo, myId}){
        if (likedUserId === user.id){
            dispatch(likeUser({
                userId : user.id,
                likedUserId : likedUserId
            }))
            return;
        }
        const response = await apiLikes.likeUser({likedUserId, userId : user.id})
        setGotenUserInfo({...user, userLikes : [...user.userLikes, {id : response.data.id, user : {id:USERID}}]})
        
    }

    async dislikeUser({dislikedUserId, dispatch, user, setGotenUserInfo}){
        if (dislikedUserId === user.id){
            dispatch(dislikeUser({
                userId : String(user.id),
                dislikedUserId : String(dislikedUserId)
            }))
            return;
        }
        await apiLikes.dislikeUser({dislikedUserId, userId : user.id})
        setGotenUserInfo({...user, userLikes : [...user.userLikes.filter((like) => like.user.id !== USERID ) ]})
    }
}

export const likesController = new LikesController();