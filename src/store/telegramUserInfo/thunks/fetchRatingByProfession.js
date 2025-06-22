import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRatingByProfession } from "../../../functions/api/getRatingByProfession";
import { USERID } from "../../../constants/tgStatic.config";

export const fetchRatingByProfession = createAsyncThunk( 'telegramUserInfo/fetchRatingByProfession', 
    async function name(_, {getState}) {
        const state = getState().telegramUserInfo;
        const ratingByProfession = await getRatingByProfession({id : USERID, profession : state.profession});
        return ratingByProfession;
    }
 )