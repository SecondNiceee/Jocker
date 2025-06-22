import { memo } from 'react';

// taggs - массив слов
const Taggs = ({taggs}) => {
    return (
        <div className='flex flex-wrap gap gap-[6px]'>

            {taggs && taggs.map( (tag, i) => (
                <div key={i} className='border-solid px-[12px] py-[7px] rounded-[8px] border-[1px] border-[#2ea5ff]'>
                    <p className='font-sf-pro-display-400 text-[14px] leading-4 tracking-wider text-white'>{tag}</p>
                </div>
            )
             )}
        </div>
    );
};

export default memo(Taggs);