import $api from "../../http";

export const getCounterOfResponses = async (userId) => {
    try{

        const reponse = await $api.get(
          `${process.env.REACT_APP_HOST}/response/findCount`,
          {
            params: {
              userId: userId,
            },
          }
          
        );
        return reponse.data
    }
    catch(e){
        console.warn(e)
    }

  }