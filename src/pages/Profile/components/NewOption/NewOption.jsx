import  { memo } from 'react';
import IsNeededToFill from './ui/IsNeededToFill';
import IsNeededToActive from './ui/IsNeededToActive';

const NewOption = ({text, isNededToFill, isActive = true, imgPath, neededActiveButton, rightArrow = true,  node, isNeededBorder, isAloneElement, numberNearToArrow, onClick = () => {}}) => {
    return (
        <div onClick={onClick} className={`flex cursor-pointer flex-col ${isActive ? 'opacity-100' : 'opacity-50'} ${isAloneElement ? "pl-[19px] rounded-[12px] bg-[#20303f] " : "ml-[19px]"}  pt-[8px] `}>
            <div className='flex'>
                {imgPath && <img src={imgPath} alt="" /> }
                  <div className={`flex gap-[7px] items-center ${imgPath ? "ml-[19px]" : ""}`}>
                    <p className="font-sf-pro-display-400 tracking-[.015em]  text-[17px] text-white">{text}</p>
                    <IsNeededToFill isNededToFill={isNededToFill} />
                    <IsNeededToActive isNeededToActive={neededActiveButton} />
                </div>
                <div className='flex gap-[11px] items-center ml-auto'>
                    {node}
                    {((numberNearToArrow !== null || numberNearToArrow !== undefined) && !node) ? <p className='font-sf-pro-display-400 text-[17px] !text-white'>{numberNearToArrow}</p> : <></>}
                    {
                        rightArrow && <img className="ml-auto mr-[16px]"  src={"/images/newProfile/leftArrow.svg"} alt="" />
                    }
                </div>
            </div>

            <div className={`${isNeededBorder ? 'opacity-1' : 'opacity-0'} w-[calc(100%-49px)] mt-[8px] h-[0.67px] ml-auto bg-[#2A343F]`}></div>

        </div>
    );
};

export default memo(NewOption);