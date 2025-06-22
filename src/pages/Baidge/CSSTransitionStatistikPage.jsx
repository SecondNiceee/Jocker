import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import "../../styles/left-right.css"
import StatisticPage from '../StatisticPage/StatisticPage';

const CSSTransitionStatistikPage = ({isStatisticOpened, userConfig, setStatistikClose}) => {
    return (
        <CSSTransition classNames={"left-right"} in = {isStatisticOpened} timeout={{enter : 0, exit : 300}} unmountOnExit mountOnEnter >
            <StatisticPage setStatistikClose = {setStatistikClose} userConfig={userConfig}  />
        </CSSTransition>        
    );
};

export default memo(CSSTransitionStatistikPage);