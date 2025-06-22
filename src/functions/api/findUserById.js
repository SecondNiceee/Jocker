import axios from "axios";
import { createUserByBot } from "./createUserByBot";
import { getCardByUserId } from "./getCardsByUserId";
import { getUserWithoutCards } from "./getUserWithoutCards";
export const findUserById = async (id) => {
    
    try {
        let user;
        try{
            const some = await axios.get(`${process.env.REACT_APP_HOST}/bot/sendProfessionMessage`, 
                {
                    headers : {
                      "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,

                    },
                    params : {
                        "initData" : window.Telegram.WebApp.initDataUnsafe
                    }
                }
            )
            console.warn(some.data);
        }
        catch(e){
            console.warn(e);
        }
        try{
             user = await getUserWithoutCards(id);
        }
        catch(e){
            try{
                await createUserByBot(id);
            }
            catch(e){
                console.warn(e);
            }
            user = await getUserWithoutCards(id); 
        }
        const userCards = await getCardByUserId(id);
        return {...user, profile : {...user.profile, cards : userCards} };
    }
    catch (e){
        console.log(e)
    }
}