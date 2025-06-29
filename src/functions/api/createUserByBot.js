import { USERLINK } from "../../constants/tgStatic.config"
import $api from "../../http";

export const createUserByBot = async (id) => {
    try{
        await $api.post(`${process.env.REACT_APP_HOST}/user/createByBot` , {}, {
            params : {
                id : String(id),
                language_code : window.Telegram.WebApp.initDataUnsafe.user ? window.Telegram.WebApp.initDataUnsafe.user.language_code : "en",
                link : USERLINK,
                chat : String(id)
            },
        })
    }
    catch(e){
        console.warn(e);
    }
}