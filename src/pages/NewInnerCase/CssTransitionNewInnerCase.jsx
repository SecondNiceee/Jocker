import React, { memo } from 'react';
import NewInnerCase from './NewInnerCase';
import { CSSTransition } from 'react-transition-group';

const CssTransitionNewInnerCase = ({isOpened, card, userInfo, setPhotoIndex, setPhotos, setSlideOpened }) => {
    return (
        <CSSTransition in = {isOpened} unmountOnExit mountOnEnter classNames={"left-right"} timeout={{enter : 0, exit : 300}}>
            <NewInnerCase setPhotoIndex={setPhotoIndex} setPhotos={setPhotos} setSlideOpened={setSlideOpened} userInfo={userInfo} casePar={card}  />
        </CSSTransition>
    );
};

export default memo(CssTransitionNewInnerCase);