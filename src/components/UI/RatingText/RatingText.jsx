
import { useMemo } from "react";
import styles from "./RatingText.module.css";
const RatingText = ({user}) => {
    const ratingConfig = useMemo( () => {
        if (!user.commonRating || !user.ratingByProfession){
            return null
        }
        if (user.commonRating > 50 && user.ratingByProfession > 50){
            return null
        }
        if (user.commonRating <= 3 || user.commonRating <= user.ratingByProfession){
            switch (user.commonRating){
                case 1:
                    return {text : "ТОП-1", style : styles.topOneCommon}
                case 2:
                    return {text : "ТОП-2", style : styles.topTwoCommon }
                case 3:
                    return {text : "ТОП-3", style : styles.topThreeCommon}
                default : {
                    return {text: `#${user.commonRating}`, style : styles.commonAll}
                }
            }
        }
        else{
            switch (user.ratingByProfession){
                case 1:
                    return {text : "ТОП-1", style : styles.topOneNitche}
                case 2:
                    return {text : "ТОП-2", style : styles.topTwoNitche }
                case 3:
                    return {text : "ТОП-3", style : styles.topThreeNitche}
                default : {
                    return {text:`#${user.ratingByProfession}`, style : styles.nitcheAll, textStyle : styles.nitcheAllText}
                }
            }
        }
    
    }, [user.commonRating, user.ratingByProfession] )
    if (!ratingConfig || !user.profession){
        return null
    }
    return (
        <div className={`${styles.topConatiner} ${ratingConfig.style}`}>
            <p className={`${styles.topText} ${ratingConfig.textStyle ?? ""}`}>{ratingConfig.text}</p>
        </div>
    );
};

export default RatingText;