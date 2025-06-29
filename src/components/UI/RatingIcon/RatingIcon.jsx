import CommonIcon from "../../../pages/Profile/components/CommonIcon/CommonIcon";
import NitcheIcon from "../../../pages/Profile/components/NitcheIcon/NitcheIcon";

const RatingIcon = ({user, className, small = false}) => {
    if (!user.profession || !user.ratingByProfession || !user.commonRating){
        return null
    }
    if (user.commonRating > 50 && user.ratingByProfession > 50){
        return null
    }
    if (user.commonRating <= 3 || user.commonRating <= user.ratingByProfession){
        return <CommonIcon small = {small} commonRating={user.commonRating} className={`!w-[53.4px]  ${className}`}  />
    }
    else{
        return <NitcheIcon small = {small} nitchRating={user.ratingByProfession} className={`!w-[53.4px] ${className}`} />
    }
};

export default RatingIcon;