import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAdditionalUserInfo } from "../../../functions/api/fetchAdditionalUserInfo";

// { isCounterOfResponses, isCommonRating, isRatingByProfession }
// isCounterOfResponses - нужно ли запрашивать количество откликов
// isCommonRating - нужно ли запрашивать общий рейтинг
// isRatingByProfession - нужно ли запрашивать общий рейтинг

export const fetchMyAdditionalUserInfo = createAsyncThunk( 
    'telegramUserInfo/fetchAdditionalUserInfo',
    async function (whatsNeededToFetch, {getState}) {
        const user = getState().telegramUserInfo;
        return await fetchAdditionalUserInfo(whatsNeededToFetch, user); 
    }
 )