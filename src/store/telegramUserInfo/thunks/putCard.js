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
            data[2].photos.forEach((e, i) => {
                let blob = e.slice(0 , e.size, "image/png")
                let newFile = new File([blob], im.data.photos[i], {type: 'image/png'});
                photos.push(newFile)
             })
             console.warn(data[2]);
             console.warn(im.data);
             let localCard = {
                ...data[2],
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