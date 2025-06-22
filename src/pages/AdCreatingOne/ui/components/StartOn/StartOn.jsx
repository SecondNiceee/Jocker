import React from 'react';
import cl from './StartOn.module.css'
import DateIcon from '../../../images/icons/date.svg'
import arrowRight from '../../../images/icons/ArrowRight.svg'
const StartOn = ({className , text, title , mistakes,  props}) => {
    return (
        <div {...props} className={className ? [cl.startOnContainer , className].join(' ') : cl.startOnContainer}>
            <Text className={cl.greyText}>{title}</Text>
        <div style={mistakes.timeError ? {border : '1px solid #FF6767'} : {}} className={cl.startOn}>
            <div className={cl.startOnLeft}>
                <img className={cl.dateIcon} src={DateIcon} alt="" />
                <Text className={cl.startText}>{text}</Text>
            </div>
                <img className={cl.arrowRight} src={arrowRight} alt="" />
        </div>
        </div>
    );
};

export default StartOn;