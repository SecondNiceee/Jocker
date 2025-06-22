import {configureStore} from '@reduxjs/toolkit'
import information from './information';
import ton from './ton';
import menuSlice from './menuSlice'
import categorys from './categorys';
import shablon from './shablon';
import  watchedAds  from './watchedAds';
import saves from './saves';
import responses from './responses';
import balance from './balance';
import profession from "./profession";
import telegramUserInfo from "./telegramUserInfo/telegramUserInfo";
import filters from "./filters";
import taskCreating from "./taskCreating";

export default configureStore( {
    reducer : {
        information : information,
        ton : ton,
        menuSlice : menuSlice,
        telegramUserInfo : telegramUserInfo,
        categorys : categorys,
        shablon : shablon,
        watchedAds : watchedAds,
        saves : saves,
        responses : responses,
        balance : balance,
        profession : profession,
        filters : filters,
        taskCreating : taskCreating
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),

});

