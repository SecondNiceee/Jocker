import { USERID } from "../../../constants/tgStatic.config";
import { apiLikes } from "../../../functions/api/ApiLikes";
import { dislikeUser } from "../../../store/telegramUserInfo/thunks/dislikeUser";
import { likeUser } from "../../../store/telegramUserInfo/thunks/likeUser";


class LikesController{

    async likeUser({userId, likedUserId, dispatch, setGotenUserInfo, myId}){
        if (likedUserId === userId){
            dispatch(likeUser({
                userId : userId,
                likedUserId : likedUserId
            }))
            return;
        }
        const response = await apiLikes.likeUser({likedUserId, userId})
        setGotenUserInfo((value) => ({...value, userLikes : [...value.userLikes, {id : response.data.id, user : {id:USERID}}]}))
        
    }

    async dislikeUser({userId, dislikedUserId, dispatch, setGotenUserInfo}){
        if (dislikedUserId === userId){
            dispatch(dislikeUser({
                userId : String(userId),
                dislikedUserId : String(dislikedUserId)
            }))
            return;
        }
        await apiLikes.dislikeUser({dislikedUserId, userId})
        setGotenUserInfo((value) => ({...value, userLikes : [...value.userLikes.filter((like) => like.user.id !== USERID ) ]}))
    }
}

export const likesController = new LikesController();