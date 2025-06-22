import axios from "axios"
import { USERLINK } from "../../constants/tgStatic.config"

export const createUserByBot = async (id) => {
    await axios.post(`${process.env.REACT_APP_HOST}/user/createByBot` , {}, {
        params : {
            id : String(id),
            language_code : window.Telegram.WebApp.initDataUnsafe.user ? window.Telegram.WebApp.initDataUnsafe.user.language_code : "en",
            link : USERLINK,
            chat : String(id)
        },
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
    })
}