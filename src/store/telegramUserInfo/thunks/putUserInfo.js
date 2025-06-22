import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERID } from "../../../constants/tgStatic.config";
export const putUserInfo = createAsyncThunk(
    "telegramUserInfo/putUserInfo",
    async function (data){
        await axios.put(`${process.env.REACT_APP_HOST}/user` , data[0] , {
            params : {
                userId : data[1] ?? USERID,
            },
            headers: {
                "Content-Type" :'application/json',
                "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,
                },
        })
        return true
    }
)