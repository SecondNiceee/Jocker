import React from 'react';
import photo from '../../../images/nonUsed/photo.svg' 
import { memo } from 'react';
const LastImages = ({images}) => {
    return (
        <div className="last-images">
          {images.map( e  => {
            return (
              <img src={e} alt="" />
            )
          })}
        </div>
    );
};

export default memo(LastImages);