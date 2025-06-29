import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const deleteServerCard = createAsyncThunk(
    "telegramUserInfo/deleteServerCard",
    async function (data){
        try{
            await $api.delete(`${process.env.REACT_APP_HOST}/card` , {
                params : {
                    id : data
                },
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