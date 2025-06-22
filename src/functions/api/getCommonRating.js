import axios from "axios"

export const getCommonRating = async (userId) => {
    const commonRating = await axios.get(`${process.env.REACT_APP_HOST}/user/ratingOne`,
        {
            params : {
                userId
            },
            headers: {
            "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
          },
        }
    );
    return commonRating.data;
}