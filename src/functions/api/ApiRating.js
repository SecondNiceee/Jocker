import axios from "axios";

class ApiRating{
    async getByUserId(id){
        try{
            const response = await axios.get(`${process.env.REACT_APP_HOST}/user/ratingOne`, {
                params : {
                    userId : id
                },
                headers: {
                    "Content-Type" :'application/json',
                    "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,
                    },
            })
            return response.data;
        }
        catch(e){
            console.warn(e);
            return null;
        }
    }
}

export const apiRating = new ApiRating();