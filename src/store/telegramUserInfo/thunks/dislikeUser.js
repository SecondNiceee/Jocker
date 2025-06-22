import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiLikes } from "../../../functions/api/ApiLikes";
export const dislikeUser = createAsyncThunk(
    'telelegramUserInfo/dislikeUser',
    async function ({userId, dislikedUserId}) {
        try{
            await apiLikes.dislikeUser({userId, dislikedUserId})
            return dislikedUserId;
        }
        catch(e){
            console.warn(e);
            throw new Error(e);
        }
        
    }
)