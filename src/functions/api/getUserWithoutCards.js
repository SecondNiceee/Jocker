import $api from "../../http";
import { formatUserFromApi } from "./formatUserFromApi";

export const getUserWithoutCards = async (id) => {
        const user = await $api.get(`${process.env.REACT_APP_HOST}/user/findOne`, {
            params: {
              id: id,
            },
          });          
          return formatUserFromApi(user.data, []);
        
}