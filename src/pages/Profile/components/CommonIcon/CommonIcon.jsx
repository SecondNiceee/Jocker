import { memo } from "react";

const CommonIcon = ({commonRating, className, small = false}) => {
        if (commonRating > 50 && !(commonRating === 1) && commonRating !== 2 && commonRating !== 3){
            return null;
        }
        if (commonRating === 1){
            return <img alt="rating-icon" className={` ${small ? "rating-icon-small" : "rating-icon"} ${className}`} src={small ? "/images/common-top1-small.svg" : "/images/common-top1.svg"} /> 
        }
        else if (commonRating === 2){
            return <img alt="rating-icon" className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`} src={small ? "/images/common-top2-small.svg" : "/images/common-top2.svg"} /> 
        }
        else if (commonRating === 3){
            return <img alt="rating-icon" className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`} src={small ? "/images/common-top3-small.svg" : "/images/common-top3.svg"} /> 
        }
        else{
            return (<div className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`}>
                <p className={`${small ? "rating-icon-small-text" : "rating-icon__text"}`}>{commonRating}</p>
            <img alt="rating-icon" className={''} src={small ? "/images/common-top1-50-small.svg" : "/images/common-top1-50.svg"} />
            </div>) 
        }
        
};

export default memo(CommonIcon);