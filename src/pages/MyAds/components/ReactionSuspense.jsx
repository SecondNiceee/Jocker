import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import BlockSpinner from '../../../components/UI/BlockSpinner/BlockSpinner';
const Reaction = lazy(() => import('./Reaction'))
const ReactionSuspense = ({openAboutReactionFunc, responce, setOpen,setPhotos,
  setPhotoIndex,
  setSlideOpened}) => {

    const { ref, inView } = useInView({
        threshold: 0, // Порог видимости (от 0 до 1)
      });
    
      const [isVisible, setVisible] = useState(false);
      useEffect(() => {
        if (inView) {
          setVisible(true);
        }
      }, [setVisible, inView]);


    return (
        <div
        style={!isVisible ? { minHeight: "144px" , width : "100%", position : "relative" } : {position : "relative"}}
      >

        {isVisible && <Suspense fallback={<BlockSpinner style = { responce.photos.length > 0 ? {minHeight : "282px"} :{minHeight : "114px"}} />} >

            <Reaction
            setPhotos = {setPhotos}
            setPhotoIndex = {setPhotoIndex}
            setSlideOpened = {setSlideOpened}
            openAboutReactionFunc={openAboutReactionFunc}
            responce={responce}
            setOpen={setOpen}
          />

           </Suspense>
        }


        <div ref={ref} style={{
                width : "1px",
                height : "2000px",
                position : "absolute",
                top : "-1800px",
                opacity : "0",
                zIndex : -1,
                left : "40px"
              
            }} className="catch_block"></div>
            </div>

        
    );
};

export default ReactionSuspense;