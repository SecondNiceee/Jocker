import { memo, useEffect, useRef, useState } from 'react';
import NitcheRating from '../NitcheRating/NitcheRating';
import Profession from '../Profession/Profession';
import ProfileUserIcon from '../ProfileUserIcon/ProfileUserIcon';
import EditIcon from '../../../../components/UI/EditIcon/EditIcon';
import NewProfileShareIcon from '../NewProfileShareIcon/NewProfileShareIcon';
import ProfileUserName from '../ProfileUserName/ProfileUserName';
import ProfileLikesCounter from '../ProfileLikesCounter/ProfileLikesCounter';
import ProfilesCounterOfWatches from '../ProfilesCounterOfWatches/ProfilesCounterOfWatches';
import { useNavigate } from 'react-router';
import { softVibration } from '../../../../functions/softVibration';
import CommonRating from '../CommonRating/CommonRating';
import "./new-profile-cup.css";
import NitcheIcon from '../NitcheIcon/NitcheIcon';
import CommonIcon from '../CommonIcon/CommonIcon';
import { useSelector } from 'react-redux';
import MyLoader from '../../../../components/UI/MyLoader/MyLoader';

const NewProfileCup = ({
  profession,
  counterOfLikes,
  positionOfNitcheRating,
  profileWatches,
  photoUrl,
  isBaidge = false,
  canLike,
  isLikeActive,
  likeUser,
  clickDislikeUser,
  commonRating,
  userId,
  fl
}) => {

  const ref = useRef(null);
  const navigate = useNavigate();
  const editIconClickHandler = ( ) => {
    softVibration();
    navigate("/BaidgeChanging")
  }

  const [shownRating, setShownRating] = useState('common');

  const me = useSelector( (state) => state.telegramUserInfo );

  useEffect( () => {
    if (commonRating && positionOfNitcheRating){
      if (commonRating <= 3){
      }
      else if (commonRating && positionOfNitcheRating){
        if (commonRating > positionOfNitcheRating ){
          setShownRating('nitche');
        }
      }
    }
  }, [commonRating, positionOfNitcheRating] );
  const switchShownRating = () => {
    if (shownRating === "nitche"){
      setShownRating("common")
    }
    else{
      setShownRating("nitche")
    }
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }

    console.warn(commonRating, positionOfNitcheRating);
    if (!positionOfNitcheRating || !commonRating){
      return <MyLoader />
    }
    return (
        <div ref={ref}  className="flex py-[17px] pb-[14px] px-[19px] flex-col gap-[13px] bg-[#20303f] rounded-[13px] ">
        <div className="flex w-[100%]">
            <div onClick={switchShownRating} className='relative flex gap-2'>
              <ProfileUserIcon photoUrl={photoUrl}  />
              <NitcheIcon className={`${shownRating === "nitche" ? "opacity-100" : "opacity-0"}`} nitchRating={positionOfNitcheRating} /> 
              <CommonIcon className={`${shownRating === "nitche" ? "opacity-0" : "opacity-100"}`} commonRating={commonRating} />
            </div>
            {shownRating === "common" ? <CommonRating onClick={switchShownRating} commonRating={commonRating} /> : <NitcheRating onClick={switchShownRating}  nitcheRating={positionOfNitcheRating} />}
            <ProfilesCounterOfWatches onClick={switchShownRating} watchesCounter={profileWatches} />
          <div className="h-[100%] ml-auto flex flex-col gap-[8px]">  
            <NewProfileShareIcon userId={userId}  professionName={profession.profession}  />
            {!isBaidge && me.id === userId && <EditIcon onClick={editIconClickHandler} />} 
          </div>
        </div>
        <div onClick={switchShownRating}  className="flex relative z-20 justify-between ">
          <div  className="flex flex-col gap-[1px]">
            <ProfileUserName fl={fl} />
            <Profession professtion={profession} />
          </div>
           <ProfileLikesCounter onClick={(e) => e.stopPropagation()}  canLike = {canLike} clickDislikeUser = {clickDislikeUser} likeUser = {likeUser} isLikeActive={isLikeActive} isBaidge={isBaidge} likesCounter={counterOfLikes} />
        </div>
      </div>
    );
};

export default memo(NewProfileCup);