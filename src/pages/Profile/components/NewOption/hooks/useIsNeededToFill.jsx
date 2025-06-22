import React from 'react';

const useIsNeededToFill = ({isNededToFill}) => {
    if (isNededToFill){
        return (
        <div className="bg-[#e18906] px-[4px] py-[3px] rounded-[5px] items-center">
            <p className="font-sf-pro-display-700 text-[10px] tracking-wide font-bold leading-[12px] uppercase text-white">Заполните</p>
        </div>
        );
    }
    return null;
};

export default useIsNeededToFill;