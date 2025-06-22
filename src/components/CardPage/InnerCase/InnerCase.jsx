import  { memo } from 'react';
import cl from './InnerCase.module.css';

import { useSliderClicker } from '../../UI/PhotosSlider/hooks/useSliderClicker';
import Text from '../../Text/Text';

const InnerCase = ({ className, task,  title , description , photos, agree = false, setPhotoIndex, setPhotos, setSliderOpened,  ...props }) => {

    const photosClickHandler = useSliderClicker({photos, setPhotoIndex, setPhotos, setSlideOpened : setSliderOpened})
    return (
        <div
        {...props} 
        className={className ? [cl.case, className].join(" ") : cl.case}
      >
        {photos.length > 0 ?
              <div className={cl.caseTop}>
              {photos.map((e , i) => {
                let url = e
                return (
                  <img onClick={photosClickHandler(i)} key={i} style={photos.length === 1 ? 
                    {minWidth : '100%'} 
                    :
                    {}
                  } src={url} alt="" />
                )
              })}
            </div> 
            :
            <></>
        }
  
        <div className={cl.caseBottom}>
          <div className={cl.caseLeft}>
            <h4>{title}</h4>
            <Text>Категория: Дизайн</Text>
          </div>

          <div style={{
            gap : "0px"
          }} className={cl.caseRight}>
            
            <div className={cl.one}>
  
            <div className={cl.circle}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.27412 14.1889C3.65286 9.80024 7.77571 7.3393 9.89984 7.09514C10.0827 7.07412 10.2305 6.92578 10.2305 6.74169V4.83951C10.2305 4.54329 10.588 4.39423 10.7985 4.60272L16.108 9.86313C16.2435 9.99739 16.239 10.2178 16.098 10.3463L10.7884 15.1859C10.5744 15.3809 10.2305 15.2291 10.2305 14.9395V12.5912C10.2305 12.4071 10.0814 12.2571 9.89748 12.2661C7.59634 12.3781 5.14118 13.6115 3.78758 14.477C3.558 14.6238 3.2507 14.4604 3.27412 14.1889Z" fill="#2EA5FF" />
    </svg>
              </div>
              
            </div>
  
            <div className={cl.two}>

            </div>
          
  
            </div>
        
  
          </div>
      </div>
    );
};

export default memo(InnerCase);