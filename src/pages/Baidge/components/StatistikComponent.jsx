import React, { memo } from 'react';
import StatistikOption from './StatistikOption';

// config = [
//     {title : String,
//         text : String
//     }
// ]
const StatistikComponent = ({title, config, className}) => {
    return (
        <div className={`flex flex-col gap-[7px] ${className}`}>
            {title ?             <p className="leading-4 text-[13px] ml-[17px] text-[#84898F] uppercase font-sf-pro-display-400 tracking-wider">
                {title}
            </p> : <></>}
            <div className="flex flex-col rounded-[12px] bg-[#20303f]">
                {config.map((e, i) => (
                    <StatistikOption text={e.text} title={e.title} configLength={config.length} index={i} key={i} />
                ))}
            </div>
        </div>
        
    );
};

export default memo(StatistikComponent);