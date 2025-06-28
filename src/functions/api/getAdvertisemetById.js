import axios from "axios";
import { formateTaskFromApi } from "../formtaTaskFromApi";

export const getAdvertisementById = async (id) => {

  const order = (await axios.get(

    `${process.env.REACT_APP_HOST}/advertisement/findOne`,
    {
      params: {
        id: id,
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
      },
    }
  )).data;

  let responsesNumber = (await axios.get(
    `${process.env.REACT_APP_HOST}/advertisement/findCount`,
    {
      params: {
        userId: order.user.id,
      },
      headers: {
        "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
      },
    }
  )).data;

  return formateTaskFromApi(order, responsesNumber, order.user)

};
