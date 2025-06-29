import $api from "../../http";

export const likeUser = async (userId, likedUserId) => {
    try{

        await $api.post(`${process.env.REACT_APP_HOST}/user/like`, {} ,{
            params : {
              userId : userInfo.id,
              likedUserId : userConfig.id
            },
          })
    }
    catch(e){
        console.warn(e)
        return e;
    }
}