import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCounterOfResponses } from "../../../functions/api/getCounterOfResponses";
import { USERID } from "../../../constants/tgStatic.config";

export const fetchCounterOfResponses = createAsyncThunk( 'telegramUserInfo/fetchCounterOfResponses', 
    async function () {
        const fetchCounterOfResponses = await getCounterOfResponses(USERID);
        return fetchCounterOfResponses;
    }
 )