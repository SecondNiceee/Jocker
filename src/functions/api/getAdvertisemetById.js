import { formateTaskFromApi } from "../formateTaskFromApi";
import $api from "../../http";

export const getAdvertisementById = async (id) => {

  const order = (await $api.get(

    `${process.env.REACT_APP_HOST}/advertisement/findOne`,
    {
      params: {
        id: id,
      },
    }
  )).data;

  let responsesNumber = (await $api.get(
    `${process.env.REACT_APP_HOST}/advertisement/findCount`,
    {
      params: {
        userId: order.user.id,
      },
    }
  )).data;

  return formateTaskFromApi(order, responsesNumber, order.user)

};
