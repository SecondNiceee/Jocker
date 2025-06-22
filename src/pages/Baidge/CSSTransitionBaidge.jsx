import React, { memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import "../../styles/left-right.css"
import Baidge from './Baidge';

const CSSTransitionStatistikPage = ({isBaidgeOpen, setBaidgeClose, userId, className}) => {
    return (
        <CSSTransition classNames={"left-right"} in = {isBaidgeOpen} timeout={{enter : 0, exit : 300}} unmountOnExit mountOnEnter >
            <Baidge className={className} gotenUserId={userId} setBaidgeClose={setBaidgeClose}  />
        </CSSTransition>        
    );
};

export default memo(CSSTransitionStatistikPage);