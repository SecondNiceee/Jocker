import { useEffect, useRef, useState } from 'react';
import Heart from '../Heart/Heart';
import ClickedHeart from '../ClickedHeart/ClickedHeart';
import "../ClickedHeart/ClickHeart.css";
import { changeVibration } from '../../../../functions/changeVibration';

const ProfileLikesCounter = ({likesCounter, onClick, canLike, isLikeActive, likeUser, clickDislikeUser}) => {

    const [localStateOfLikeActive, setLocalStateOfLikeActive] =  useState(isLikeActive)

    const [animation, setAnimation] = useState(0)

    const animationRef = useRef(null)

    const clickHandler = async () => {
        if (!localStateOfLikeActive){
          changeVibration();
          likeUser(); 
          setAnimation(1)
        }
        else{
          changeVibration();
          clickDislikeUser();
          setAnimation(0)
        }
        setLocalStateOfLikeActive((value) => !value)
    }

    useEffect( () => {
      if (animation > 0){
        animationRef.current?.classList.add("zoomAnimate")
      }
      else{
        animationRef.current?.classList.remove("zoomAnimate")
      }
    }, [animation] )

    if(canLike){
      return (
        <div onClick={onClick} className='flex items-center gap-[6.67px] relative z-50 mt-auto mb-[2px]'>
          <p className={`font-sf-pro-display font-medium text-[17px] ${!localStateOfLikeActive ? 'text-[white]' : 'text-[#ff4949]'}`}>
            {likesCounter}
          </p>
          <div ref={animationRef} onClick={clickHandler} className='flex relative justify-center rounded-full items-center bg-[#18222d] w-[30px] h-[30px]'>
              <ClickedHeart isActiveHeart={localStateOfLikeActive}  />
          </div>
        </div>
      )
    }
    return (
        <div onClick={onClick} className="flex items-center gap-[6.67px] mt-auto mb-[2px]">
        <p className="font-sf-pro-display font-medium text-[17px] text-[#b5ced9]">
          {likesCounter}
        </p>
        <Heart />
      </div>
    );
};

export default ProfileLikesCounter;