import { memo } from 'react';
import useGetLinksFormatedArray from '../hooks/useGetLinksFormatedArray';
import { openLink } from '../../../functions/openLink';

const Links = ({links, isFirstMyLink, user}) => {
    const formatedLinks = useGetLinksFormatedArray({links, isFirstMyLink, user})
    const clickHandler = (link) => () => {
        openLink(link)
    }
    return (
        <div className='rounded-[13px] bg-[#21303f] '>
            {formatedLinks.map( (link, i) => {
                if (link.link){
                    return (
                        <div key={i} onClick={clickHandler(link.link)} className='flex cursor-pointer py-[12px] items-center pl-[19px] pr-[16px]'>
                            <div className='flex w-[40px] h-[40px] rounded-full bg-[#2ea5ff] items-center justify-center'>
                                <img alt='' src='/images/Baidge/bag.svg' />
                            </div>
                            <div className='flex ml-[10px] flex-col gap-[3px]'>
                                <p className='font-sf-pro-display leading-[15px] text-[17px] tracking-wide text-white'>{link.title}</p>
                                <p className='font-sf-pro-display-400 leading-[17px] text-[14px] tracking-wide text-[#b5ced9]'>{link.profession}</p>
                            </div>
                            <img className='ml-auto' alt='#' src='/images/newProfile/leftArrow.svg' />
                        </div>
                    )
                }
                return null;
            } )}
        </div>
    );
};

export default memo(Links);