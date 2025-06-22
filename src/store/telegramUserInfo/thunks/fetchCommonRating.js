import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCommonRating } from "../../../functions/api/getCommonRating";
import { USERID } from "../../../constants/tgStatic.config";

export const fetchCommonRating = createAsyncThunk( 'telegramUserInfo/fetchCommonRating', 
    async function () {
        const rating = await getCommonRating(USERID);
        return rating;
    }
 )