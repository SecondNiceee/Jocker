import { createAsyncThunk } from "@reduxjs/toolkit";
import { USERID } from "../../../constants/tgStatic.config";
import $api from "../../../http";

export const postCard = createAsyncThunk(
    "telegramUserInfo/postUserInfo",
    async function (data){
        try{
            let im = await $api.post(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        userId : Number(USERID),
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
                      },
                }
             )
            let localCard = {
                ...data[2],
                createdAt : im.data.createdAt,
                photosNames : im.data.photos,
                photos : im.data.photos,
                id : im.data.id
            }
            return localCard
        }
        catch(e){
            alert(JSON.stringify(e))
            console.warn(e)
            return false
        }
    }
)