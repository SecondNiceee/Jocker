import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import MainButton from '../../../constants/MainButton';
import BackButton from '../../../constants/BackButton';
import { enableColorAndActiveButton } from '../../../functions/enableColorAndActiveButton';

let overflowYValue;
const PhotosSlider = forwardRef(({ swiperId, renderMap, className, sliderIndex,  blockerId, blockerAll, setSliderOpened, left = 0, top = 0 }, ref) => {
    useEffect( () => {
        const el = document.querySelector('.connect-header');
        el.style.display = "none";
        return () => {
            el.style.display = "flex";
        }
    }, [] )
    useEffect( () => {
        const closeSlider = () => {
            setSliderOpened(false)
        }
        MainButton.show();
        enableColorAndActiveButton();
        MainButton.onClick(closeSlider);
        return () => {
            MainButton.offClick(closeSlider);
        }
    }, [setSliderOpened] )
    const render = (src, index) => {
        return (
                <SwiperSlide className='!h-[100%] max-h-[90vh] w-[100%] object-cover my-auto' key={index}>
                    <div className='h-[100%] flex items-center'>
                        <img className='w-[100%] h-[auto] object-cover' src={src} alt={`Slide ${index}`} />
                    </div>
                </SwiperSlide>
        );
    };
    const [scrollPosition , setScrollPosition] = useState(0)

    const closeSliderFunction = useCallback( () => {
        setSliderOpened(false)
    }, [setSliderOpened] )

    useEffect( () => {
        BackButton.onClick(closeSliderFunction);
        return () => {
            BackButton.offClick(closeSliderFunction);
        }
    }, [closeSliderFunction] )

    useEffect( () => {
        const buttonText = MainButton.text
        const isVisible = MainButton.isVisible 
        MainButton.onClick(closeSliderFunction)
        MainButton.show();
        MainButton.setText("Закрыть")
        MainButton.onClick(closeSliderFunction)
        return () => {
            MainButton.setText(buttonText)
            MainButton.offClick(closeSliderFunction)
            if (!isVisible){
                MainButton.hide()
            }
        }
    } , [closeSliderFunction] );


    useEffect( () => {
        if (blockerAll){
            overflowYValue = window.getComputedStyle(document.documentElement).overflowY;
            document.documentElement.style.overflowY = "hidden";
            document.body.style.overflowY = "hidden";

            setScrollPosition(0)
        }
        else{
            const firstElement = document.getElementById(blockerId)
            firstElement.style.overflowY = "hidden";
            const scrollTop = firstElement.scrollTop;
            setScrollPosition(scrollTop);
        }
        return () => {
            if (blockerAll){
                document.documentElement.style.overflowY = overflowYValue;
            }
            else{
                const firstElement = document.getElementById(blockerId)
                firstElement.style.overflowY = "hidden";
            }
        }
    } , [blockerAll, blockerId]) 

    // Блокировка скролла body на время открытия слайдера (iOS-friendly)
    useEffect(() => {
        if (blockerAll) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100vw';
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                document.body.style.touchAction = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [blockerAll]);

    const [activeIndex, setActiveIndex] = useState(sliderIndex);

    const swiperRef = useRef(null);

    const handleSlideChange = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setActiveIndex(swiperRef.current.swiper.activeIndex);
        }
    };

    const numberOfPhotos = renderMap.length

    return (
        <div ref={ref} className={`w-[100vw] h-[100vh] fixed z-[200000] flex-col bg-black flex justify-center items-center ${className}`} style={{
            left : left,
            top : top ? top : scrollPosition + "px"
        }}>
            <p className='font-sf-pro-display text-[18.56px] translate-y-[57px] text-white relative z-[999]'>{activeIndex + 1}/{numberOfPhotos}</p>
            <Swiper className='w-[100%] h-[100%]' id={`main-${swiperId}`}
                    initialSlide={sliderIndex}
                    slidesPerView={1}
                    onSlideChange={handleSlideChange}
                    ref={swiperRef}
                    spaceBetween={20}
                    >
                {renderMap.map(render)}
            </Swiper>
        </div>
    );
});

export default PhotosSlider;