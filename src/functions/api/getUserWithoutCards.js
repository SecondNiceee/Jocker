import axios from "axios";
import { formatUserFromApi } from "./formatUserFromApi";

export const getUserWithoutCards = async (id) => {
        const user = await axios.get(`${process.env.REACT_APP_HOST}/user/findOne`, {
            params: {
              id: id,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          });          
          return formatUserFromApi(user.data, []);
        
}