import React, { memo } from 'react';
import NewChangeCard from './NewChangeCard';
import "../../styles/left-right.css";
import { CSSTransition } from 'react-transition-group';

const CssTransitionNewChangeCard = ({card, isChangingCardOpened, setChangingCardOpened}) => {
    return (
        <CSSTransition in = {isChangingCardOpened} unmountOnExit mountOnEnter classNames={"left-right"} timeout={{enter : 0, exit : 300}}>
            <NewChangeCard isChangingCardOpened={isChangingCardOpened}  setChangingCardOpened = {setChangingCardOpened} card={card}/>
        </CSSTransition>
    );
};

export default memo(CssTransitionNewChangeCard);