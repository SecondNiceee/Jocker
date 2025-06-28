import { createAsyncThunk } from "@reduxjs/toolkit";
import { USERID } from "../../../constants/tgStatic.config";
import $api from "../../../http";

export const putUserInfo = createAsyncThunk(
    "telegramUserInfo/putUserInfo",
    async function (data){
        await $api.put(`${process.env.REACT_APP_HOST}/user` , data[0] , {
            params : {
                userId : data[1] ?? USERID,
            },
            headers: {
                "Content-Type" :'application/json',
                },
        })
        return true
    }
)