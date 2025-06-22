import axios from "axios"

export const getIsResponsed = async (executorId, consumerId) => {
    const response = await axios.get(`${process.env.REACT_APP_HOST}/response/isResponsed`, {
        params : {
            executorId,
            consumerId
        },
        headers : {
        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    return response.data;
}