import { memo } from "react";

const CommonIcon = ({commonRating, className}) => {

        if (commonRating > 50 && !(commonRating === 1) && commonRating !== 2 && commonRating !== 3){
            return null;
        }
        if (commonRating === 1){
            return <img alt="rating-icon" className={`rating-icon ${className}`} src={"/images/common-top1.svg"} /> 
        }
        else if (commonRating === 2){
            return <img alt="rating-icon" className={`rating-icon ${className}`} src={"/images/common-top2.svg"} /> 
        }
        else if (commonRating === 3){
            return <img alt="rating-icon" className={`rating-icon ${className}`} src={"/images/common-top3.svg"} /> 
        }
        else{
            return (<div className={`rating-icon ${className}`}>
                <p className={"rating-icon__text"}>{commonRating}</p>
            <img alt="rating-icon" className={''} src={"/images/common-top1-50.svg"} />
            </div>) 
        }
        
};

export default memo(CommonIcon);