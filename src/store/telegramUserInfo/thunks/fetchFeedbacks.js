import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeedBacksByUserId } from "../../../functions/api/fetchFeedbacksByUserId";
import { USERID } from "../../../constants/tgStatic.config";

export const fetchFeedBacks = createAsyncThunk( 'telegramUserInfo/fetchFeedBacks', 
    async function () {
        return await fetchFeedBacksByUserId(USERID);
    }
 )