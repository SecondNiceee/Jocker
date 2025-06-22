import  { useCallback, useEffect, useRef } from "react";
import PayBlock from "./components/PayBlock/PayBlock";
import useGetOptionsConfig from "./hooks/useGetOptionsConfig";
import NewOption from "./components/NewOption/NewOption";
import NewProfileCup from "./components/NewProfileCup/NewProfileCup";
import useGetUserPhotoLink from "../../hooks/useGetUserPhotoLink";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import ProfileCup from "./components/ProfileCup/ProfileCup";
import pagesHistory from "../../constants/pagesHistory";
import { fetchRatingByProfession } from "../../store/telegramUserInfo/thunks/fetchRatingByProfession";
import { fetchCommonRating } from "../../store/telegramUserInfo/thunks/fetchCommonRating";
import { useNavigate } from "react-router";
import BackButton from "../../constants/BackButton";
import MainButton from "../../constants/MainButton";

const NewProfile = () => {
  const optionsConfig = useGetOptionsConfig();

  const photoLink = useGetUserPhotoLink({});

  const userInfo = useSelector((state) => state.telegramUserInfo);

  const navigate = useNavigate();

  useEffect( () => {
    MainButton.hide();
  }, [] )

  const goBack = useCallback( () => {
    if (pagesHistory[pagesHistory.length-1] === "/BaidgeCreating"){
      navigate(-2);
    }
    else{
      navigate(-1);
    }
  }, [navigate] )

  useEffect( () => {
    BackButton.show();
    BackButton.onClick(goBack)
    return () => {
      BackButton.offClick(goBack);
    }
  }, [goBack] )

  useEffect( () => {
    pagesHistory.push("/Profile")
  }, [] );

  const dispatch = useDispatch();

  const isLoadedInf = useRef(false);
  useEffect( () => {
    if (userInfo.profession && !isLoadedInf.current){
      if (!userInfo.ratingByProfession){
        dispatch(fetchRatingByProfession());
      }
      if (!userInfo.commonRating){
        dispatch(fetchCommonRating());
      }
      isLoadedInf.current = true;
    }
  }, [userInfo.profession, dispatch, userInfo.ratingByProfession, userInfo.commonRating] ) ;
  if (userInfo.profession && (!userInfo.ratingByProfession || !userInfo.commonRating)){
    return <MyLoader />
  }
  if (userInfo.state !== "yes"){
    return <MyLoader />
  }
  return (
    <div className="pt-[16px] px-[16px] w-full bg-[#18222d] gap-[16px] flex flex-col pb-[100px]">

      {userInfo.profession ?  <NewProfileCup
       userId={userInfo.id}
        canLike={false}
        counterOfLikes={userInfo.userLikes.length}
        isLikeActive={false}
        isBaidge = {false}
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        photoUrl={photoLink}
        profession={userInfo?.profession}
        profileWatches={userInfo.views}
        positionOfNitcheRating={userInfo.ratingByProfession}
        commonRating = {userInfo.commonRating}
        fl={userInfo.fl}

      /> : <ProfileCup gotenUserInfo={userInfo} />}

      <PayBlock />

      <div className="flex flex-col rounded-[12px] bg-[#20303f]">
        {optionsConfig.map((option, i) => (
          <NewOption
            imgPath={option.imgPath}
            isNededToFill={option.isNeededFill}
            neededActiveButton={option.isNeededActiveTitle}
            text={option.text}
            key={i}
            isNeededBorder={i !== Number(optionsConfig.length - 1)}
            isAloneElement={false}
          onClick={option.clickFunc}
          />
        ))}
      </div>

      <NewOption
        isAloneElement={true}
        imgPath={"/images/newProfile/subscription.svg"}
        isNededToFill={false}
        neededActiveButton={true}
        text={"Подписка"}
      />

      <NewOption
        isAloneElement={true}
        imgPath={"/images/newProfile/refSystemIcon.svg"}
        isNededToFill={false}
        neededActiveButton={false}
        text={"Реферальная система"}
      />

    </div>
  );
};

export default NewProfile;
