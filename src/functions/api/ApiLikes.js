import $api from "../../http";

class ApiLikes{
    async likeUser({userId, likedUserId }){
        const response = await $api.post(`${process.env.REACT_APP_HOST}/user/like`, {} ,{
            params : {
              userId : userId,
              likedUserId : likedUserId
            },
          })
        return response;
    }

    async dislikeUser({userId, dislikedUserId }){
        await $api.post(`${process.env.REACT_APP_HOST}/user/dislike`, {} ,{
            params : {
              userId : userId,
              likedUserId : dislikedUserId
            },
          })
        
        return dislikedUserId;
    }
}

export const apiLikes = new ApiLikes();