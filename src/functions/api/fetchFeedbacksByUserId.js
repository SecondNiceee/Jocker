import axios from "axios"

export const fetchFeedBacksByUserId = async (userId) => {
    const feedbacks = await axios.get(`${process.env.REACT_APP_HOST}/review/findByReviewedUser`, {
        params : {
            reviewedUserId : userId
        },
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    return feedbacks.data;
}