import React, { memo } from 'react';
import useIsNeededToFill from './hooks/useIsNeededToFill';
import useIsNeededToActive from './hooks/useIsNeededToActive';

const NewOption = ({text, isNededToFill, imgPath, neededActiveButton, node, isNeededBorder, isAloneElement, numberNearToArrow, onClick = () => {}}) => {
    const IsNeededToFillJsxComponent = useIsNeededToFill({isNededToFill})
    const isNeededActiveJsxComponent = useIsNeededToActive({isNeededToActive : neededActiveButton})
    return (
        <div onClick={onClick} className={`flex cursor-pointer flex-col ${isAloneElement ? "pl-[19px] rounded-[12px] bg-[#20303f] " : "ml-[19px]"}  pt-[8px] `}>
            <div className='flex'>
                <img src={imgPath} alt="" />
                  <div className="flex gap-[7px] items-center ml-[19px]">
                    <p className="font-sf-pro-display-400 tracking-[.015em]  text-[17px] text-white">{text}</p>
                    {IsNeededToFillJsxComponent}
                    {isNeededActiveJsxComponent}
                </div>
                <div className='flex gap-[11px] items-center ml-auto'>
                    {node}
                    {((numberNearToArrow !== null || numberNearToArrow !== undefined) && !node) ? <p className='font-sf-pro-display-400 text-[17px] !text-white'>{numberNearToArrow}</p> : <></>}
                    <img className="ml-auto mr-[16px]"  src={"/images/newProfile/leftArrow.svg"} alt="" />
                </div>
            </div>

            <div className={`${isNeededBorder ? 'opacity-1' : 'opacity-0'} w-[calc(100%-49px)] mt-[8px] h-[0.5px] ml-auto bg-[#384656]`}></div>

        </div>
    );
};

export default memo(NewOption);