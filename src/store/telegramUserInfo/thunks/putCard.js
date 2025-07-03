import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../http";

export const putCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        try{
            let im = await $api.put(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        id : data[1],
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Contrsol-Allow-Origin": "*",
                      },
                }
            )
             let localCard = {
                ...data[2],
                watches : im.data.watches,
                photosNames : im.data.photos,
                photos : im.data.photos,
                id : im.data.id,
                views : im.data.views
            }
            return localCard
        }
        catch(a){
            console.warn(a)
        }
    }
)