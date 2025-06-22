import axios from "axios";

class ApiLikes{
    async likeUser({userId, likedUserId }){
        const response = await axios.post(`${process.env.REACT_APP_HOST}/user/like`, {} ,{
            params : {
              userId : userId,
              likedUserId : likedUserId
            },
            headers : {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            }
          })
        return response;
    }

    async dislikeUser({userId, dislikedUserId }){
        await axios.post(`${process.env.REACT_APP_HOST}/user/dislike`, {} ,{
            params : {
              userId : userId,
              likedUserId : dislikedUserId
            },
            headers : {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            }
          })
        
        return dislikedUserId;
    }
}

export const apiLikes = new ApiLikes();