import React from 'react';
import icon from '../../../images/icons/icon.svg';
import LastTopCenter from './LastTopCenter';
import LastLeftArr from './LastLeftArr';
const LastTop = ({openAboutReactionFunc}) => {
    return (
        <div onClick = {() => {
            openAboutReactionFunc()
        }} className="last-top">
            <img src={icon} alt="" className="icon" />
            <LastTopCenter />
            <LastLeftArr  />
        </div>
    );
};

export default LastTop;