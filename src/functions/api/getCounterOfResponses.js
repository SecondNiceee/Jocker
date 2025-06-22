import axios from "axios";

export const getCounterOfResponses = async (userId) => {
    try{

        const reponse = await axios.get(
          `${process.env.REACT_APP_HOST}/response/findCount`,
          {
            params: {
              userId: userId,
            },
            headers : {
              "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
            }
          }
          
        );
        return reponse.data
    }
    catch(e){
        console.warn(e)
    }

  }