import axios from "axios";
import { createUserByBot } from "./createUserByBot";
import { getCardByUserId } from "./getCardsByUserId";
import { getUserWithoutCards } from "./getUserWithoutCards";
export const findUserById = async (id) => {
    try {
        let user;
        try{
             user = await getUserWithoutCards(id);
        }
        catch(e){      
            console.warn(e);
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