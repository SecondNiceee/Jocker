import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const putCard = createAsyncThunk(
    "telegramUserInfo/putCard",
    async function (data){
        console.warn(data[2]);
        try{

            let im = await axios.put(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        id : data[1],
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Contrsol-Allow-Origin": "*",
                        "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY

                      },
                }
            )
            let photos = []
             let localCard = {
                ...data[2],
                watches : im.data.watches,
                photosNames : im.data.photos,
                photos : photos,
                id : im.data.id
            }
            return localCard
        }
        catch(a){
            console.warn(a)
        }
    }
)