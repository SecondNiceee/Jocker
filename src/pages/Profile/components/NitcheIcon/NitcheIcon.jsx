import { memo } from "react";

const NitcheIcon = ({nitchRating, className, small=false}) => {
        if (nitchRating === 1){
            return <img alt="rating-icon" className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`} src={small ? "/images/nitche-top1-small.svg" : '/images/nitche-top1.svg'} /> 
        }
        if (nitchRating === 2){
            return <img alt="rating-icon" className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`} src={small ? "/images/nitche-top2-small.svg" : "/images/nitche-top2.svg"} /> 
        }
        if (nitchRating === 3){
            return <img alt="rating-icon" className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`} src={small ? "/images/nitche-top3-small.svg" : "/images/nitche-top3.svg"} /> 
        }
        if (nitchRating < 51 && nitchRating > 3){
            return (<div className={`${small ? "rating-icon-small" : "rating-icon"} ${className}`}>
                <p className={`${small ? "rating-icon-small-text" : "rating-icon__text"}`}>{nitchRating}</p>
            <img alt="rating-icon" className={``} src={small ? "/images/nitche-top1-50-small.svg" : "/images/nitche-top1-50.svg"} />
            </div>) 
        }
        return null;
};

export default memo(NitcheIcon);