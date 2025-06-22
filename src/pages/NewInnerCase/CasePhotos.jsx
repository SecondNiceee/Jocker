import React from 'react';

const CasePhotos = ({photos, onClickPhotos}) => {
    return (
    <div className="flex m-[4px_4px_0px_4px] gap-1 overflow-x-scroll max-w-full z-50 rounded-[6.67px]">
        {photos.map((e, i) => {
        let url = e;
        return (
            <img
            className='min-w-[calc(0.48*100vw)] h-[calc(0.35*100vw)] rounded-[6.67px] object-cover'
            onClick={() => {onClickPhotos(i)}}
            key={i}
            style={photos.length === 1 ? { minWidth: "100%" } : {}}
            src={url}
            alt=""
            />
        );
        })}
    </div>
    );
};

export default CasePhotos;