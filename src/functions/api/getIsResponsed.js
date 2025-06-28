import $api from "../../http";

export const getIsResponsed = async (executorId, consumerId) => {
    const response = await $api.get(`${process.env.REACT_APP_HOST}/response/isResponsed`, {
        params : {
            executorId,
            consumerId
        },
    })
    return response.data;
}