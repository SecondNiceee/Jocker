import { apiLikes } from "../../../functions/api/ApiLikes";
import { dislikeUser } from "../../../store/telegramUserInfo/thunks/dislikeUser";
import { likeUser } from "../../../store/telegramUserInfo/thunks/likeUser";


class LikesController{

    async likeUser({likedUserId, dispatch, setGotenUserInfo, myId, user}){
        if (likedUserId === myId){
            dispatch(likeUser({
                userId : myId,
                likedUserId : likedUserId
            }))
            return;
        }
        const response = await apiLikes.likeUser({likedUserId, myId})
        setGotenUserInfo({...user, userLikes : [...user.userLikes, {id : response.data.id, user : {id:myId}}]})
        
    }

    async dislikeUser({myId, dislikedUserId, dispatch, setGotenUserInfo, user}){
        if (dislikedUserId === myId){
            dispatch(dislikeUser({
                userId : String(myId),
                dislikedUserId : String(dislikedUserId)
            }))
            return;
        }
        await apiLikes.dislikeUser({dislikedUserId, myId})
        setGotenUserInfo({...user, userLikes : [...user.userLikes.filter((like) => like.user.id !== myId )]})
    }
}

export const likesController = new LikesController();