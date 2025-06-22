import formatNumberWithSpaces from "../../../functions/formateMoneyWithSpace";
import getYearWord from "../../../functions/getYearWord";

const useGetProfileStatistics = ({userConfig }) => {
    
    console.log(userConfig)
    return [
        {
            title : "Позиция в общем рейтинге",
            text : userConfig.commonRating ?? "-"
        },
        {
            title : "Позиция в рейтинге по нише",
            text : userConfig.ratingByProfession
        },
        {
            title : "Очков рейтинга",
            text : formatNumberWithSpaces(userConfig.rating)
        },
        {
            title : "Просмотров профиля",
            text : formatNumberWithSpaces(userConfig.views)
        },
        {
            title : "Просмотров кейсов",
            text : userConfig.profile.cards.reduce( (acc, el) => acc += el.views, 0 )
        },
        {
            title : "Лайков профиля",
            text : userConfig.userLikes.length
        },
        {
            title : "Стаж/Опыт работы",
            text : getYearWord(userConfig.profile.stage)
        }
    ]
};

export default useGetProfileStatistics;