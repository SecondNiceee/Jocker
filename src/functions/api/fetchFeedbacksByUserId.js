import $api from "../../http";

export const fetchFeedBacksByUserId = async (userId) => {
    const feedbacks = await $api.get(`${process.env.REACT_APP_HOST}/review/findByReviewedUser`, {
        params : {
            reviewedUserId : userId
        },
    })
    return feedbacks.data;
}