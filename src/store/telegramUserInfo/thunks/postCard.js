import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USERID } from "../../../constants/tgStatic.config";
export const postCard = createAsyncThunk(
    "telegramUserInfo/postUserInfo",
    async function (data){
        console.warn(data);

        alert("Привет")
        try{
            let im = await axios.post(`${process.env.REACT_APP_HOST}/card` , data[0] , 
                {
                    params : {
                        userId : Number(USERID),
                    },
                    headers: {
                        "Content-Type" :'multipart/form-data',
                        "Access-Control-Allow-Origin": "*",
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
             console.warn(im.data);
            let localCard = {
                ...data[2],
                createdAt : im.data.createdAt,
                photosNames : im.data.photos,
                photos : photos,
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