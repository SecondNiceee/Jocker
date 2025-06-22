import LastTopCenter from './LastTopCenter';
import LastLeftArr from './LastLeftArr';
import { memo } from 'react';
const LastTop = ({openAboutReactionFunc, photo, stage, name}) => {
    return (
        <div onClick = {() => {
            openAboutReactionFunc(true)
        }} className="last-top">
            <img src={photo} alt="" className="icon" />
            <LastTopCenter name = {name} stage = {stage} />
            <LastLeftArr  />
        </div>
    );
};

export default memo(LastTop);