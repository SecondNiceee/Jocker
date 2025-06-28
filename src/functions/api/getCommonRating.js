import $api from "../../http";

export const getCommonRating = async (userId) => {
    const commonRating = await $api.get(`${process.env.REACT_APP_HOST}/user/ratingOne`,
        {
            params : {
                userId
            },
        }
    );
    return commonRating.data;
}