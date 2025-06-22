import axios from "axios"

export const getRatingByProfession = async (user) => {
    if (user.profession){
        const ratingByProfession = await axios.get(`${process.env.REACT_APP_HOST}/user/ratingOneByProfession`, {
            params : {
                userId : user.id,
                professionId : user.profession.id
            },
            headers: {
            "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
          },
        })
        return ratingByProfession.data;
    }
    return null
}