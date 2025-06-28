import $api from "../../http";

class ApiRating{
    async getByUserId(id){
        try{
            const response = await $api.get(`${process.env.REACT_APP_HOST}/user/ratingOne`, {
                params : {
                    userId : id
                },
                headers: {
                    "Content-Type" :'application/json',
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