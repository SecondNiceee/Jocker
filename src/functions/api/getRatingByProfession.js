import $api from "../../http";

export const getRatingByProfession = async (user) => {
    if (user.profession){
        const ratingByProfession = await $api.get(`${process.env.REACT_APP_HOST}/user/ratingOneByProfession`, {
            params : {
                userId : user.id,
                professionId : user.profession.id
            },
        })
        return ratingByProfession.data;
    }
    return null
}