import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import $api from "../../../http";
export const deleteServerCard = createAsyncThunk(
    "telegramUserInfo/deleteServerCard",
    async function (data){
        try{
            await $api.delete(`${process.env.REACT_APP_HOST}/card` , {
                params : {
                    id : data
                },
                // headers : {
                //     "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY,
                //     "x-init-data": window.Telegram.WebApp.initData
                //   }
            }
            )
            return data
        }
        catch(e){
            window.Telegram.WebApp.showAlert(JSON.stringify(e))
            console.warn(e)
        }
    }
)