import { getCommonRating } from "./getCommonRating";
import { getCounterOfResponses } from "./getCounterOfResponses";
import { getRatingByProfession } from "./getRatingByProfession";


// тут в параметрах приходят темы
// { isCounterOfResponses, isCommonRating, isRatingByProfession }
// isCounterOfResponses - нужно ли запрашивать количество откликов
// isCommonRating - нужно ли запрашивать общий рейтинг
// isRatingByProfession - нужно ли запрашивать общий рейтинг


export const fetchAdditionalUserInfo = async (whatIsNeededToFetch, user) => {

    const {isCounterOfResponses, isCommonRating, isRatingByProfession } = whatIsNeededToFetch;



    let addittionalInfo = {};
    if (isCounterOfResponses){
        const counterOfResponses = await getCounterOfResponses(user.id);
        addittionalInfo = {...addittionalInfo, counterOfResponses}
    }
    if (isCommonRating){
        const commonRating = await getCommonRating(user.id);
        addittionalInfo = {...addittionalInfo, commonRating}
    }
    if (isRatingByProfession){
        const ratingByProfession = await getRatingByProfession(user);
        addittionalInfo = {...addittionalInfo, ratingByProfession}
    }

    console.warn(addittionalInfo);

    return addittionalInfo;

}