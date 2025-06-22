import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiLikes } from "../../../functions/api/ApiLikes";
export const likeUser = createAsyncThunk(
    'telelegramUserInfo/likeUser',
    async function ({userId, likedUserId}) {
        await apiLikes.likeUser({likedUserId, userId})
        return likedUserId;
    }
)