import { useEffect, useMemo, useRef } from "react";
import NewProfileCup from "../../Profile/components/NewProfileCup/NewProfileCup";
import NewOption from "../../Profile/components/NewOption/NewOption";
import { useDispatch, useSelector } from "react-redux";
import useGetUserPhotoLink from "../../../hooks/useGetUserPhotoLink";
import { likesController } from "../controllers/LikesController";
import Taggs from "./Taggs";
import Links from "./Links";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
import useNavigateBack from "../../../hooks/useNavigateBack";
import useGetBaidgeOprionsConfig from "../hooks/useGetBaidgeOprionsConfig";
import { apiRating } from "../../../functions/api/ApiRating";
import { getCounterOfResponses } from "../../../functions/api/getCounterOfResponses";
import { getRatingByProfession } from "../../../functions/api/getRatingByProfession";
import { getCommonRating } from "../../../functions/api/getCommonRating";
import { fetchCommonRating } from "../../../store/telegramUserInfo/thunks/fetchCommonRating";
import { fetchCounterOfResponses } from "../../../store/telegramUserInfo/thunks/fetchCounterOfResponses";
import { fetchRatingByProfession } from "../../../store/telegramUserInfo/thunks/fetchRatingByProfession";
import { fetchFeedBacks } from "../../../store/telegramUserInfo/thunks/fetchFeedbacks";
import { fetchFeedBacksByUserId } from "../../../functions/api/fetchFeedbacksByUserId";
import useScrollTop from "../../../hooks/useScrollTop";

const BaidgeWithProfile = ({ userInfo, className, setUserInfo, urlParametr}) => {

  const me = useSelector((state) => state.telegramUserInfo);

  const dispatch = useDispatch();

  useScrollTop();

  useNavigateBack({isSliderOpened : false, setSlideOpened : false})

  const isLikeActive = useMemo(() => {
    if (!userInfo) {
      return null;
    }
    return userInfo.userLikes.map((like) => like.user.id).includes(me.id);
  }, [userInfo, me.id]);

  const photoUrl = useGetUserPhotoLink({anotherUserInfo : userInfo});

  const optionsConfig = useGetBaidgeOprionsConfig({userInfo})

  const clickLikeUser = () => {
    likesController.likeUser({
      dispatch: dispatch,
      userId: me.id,
      likedUserId: userInfo.id,
      setGotenUserInfo : setUserInfo
    });
  };

  const clickDislikeUser = () => {
    likesController.dislikeUser({
      dispatch: dispatch,
      userId: me.id,
      dislikedUserId: userInfo.id,
      setGotenUserInfo : setUserInfo
    });
  };
  const ratingLoaded = useRef(false);



  useEffect( () => {
      async function fetchAdditionalUserInfo(params) {
        let commonRating = null;
        let responsesCounter = null;
        let ratingByProfession = null;
        let feedbacks = null;
        await apiRating.getByUserId(userInfo.id).then((rate) => {
          commonRating = rate
        } ).catch(err => console.warn(err))
        await getCounterOfResponses(userInfo.id).then( (counter) =>  {
          responsesCounter = counter;
        })
        await getRatingByProfession(userInfo).then( (rating) => {
          ratingByProfession = rating;
        } )
        await getCommonRating(userInfo.id).then( (rate) => {
          commonRating = rate;
        } )
        await fetchFeedBacksByUserId(userInfo.id).then(feedbacksData => {
          feedbacks = feedbacksData;
        })
        console.warn({commonRating, responsesCounter, ratingByProfession, feedbacks});
        return {commonRating, responsesCounter, ratingByProfession, feedbacks}
      } 
      if (userInfo){
        if (!ratingLoaded.current){
          if (userInfo.id === me.id){
            if (!userInfo.commonRating){
              dispatch(fetchCommonRating())
            }
            if (!userInfo.responsesCounter){
              dispatch(fetchCounterOfResponses());
            }
            if (!userInfo.ratingByProfession){
              dispatch(fetchRatingByProfession());
            }
            if (!userInfo.feedbacks){
              dispatch(fetchFeedBacks());
            }
          }
          else{
              fetchAdditionalUserInfo().then( (info) => setUserInfo((value) => ({...value, ...info})) )
          }
        }
        ratingLoaded.current = true;
      }

  } , [userInfo, setUserInfo, me.id, dispatch])

  return (
    <>
      <div className={`pt-[16px] w-full  z-50 px-[16px] bg-[#18222d] gap-[16px] flex flex-col  pb-[100px] ${className}`}>

        <NewProfileCup
        userId={userInfo.id}
          canLike={true}
          fl={userInfo.fl}
          isLikeActive={isLikeActive}
          isBaidge={urlParametr}
          counterOfLikes={userInfo.userLikes.length}
          positionOfNitcheRating={userInfo.ratingByProfession}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          photoUrl={photoUrl}
          profession={userInfo?.profession}
          profileWatches={userInfo.views}
          likeUser={clickLikeUser}
          commonRating={userInfo.commonRating}
          clickDislikeUser={clickDislikeUser} />


        <div className="flex flex-col rounded-[12px] bg-[#20303f]">
          {optionsConfig.map((option, i) => (
            <NewOption
              node={option.node}
              numberNearToArrow={option.numberNearToArrow}
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
        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
          <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
            КРАТКОЕ РЕЗЮМЕ
          </p>
          <TextAboutMe aboutU={userInfo.profile.about} />
        </div>

        {userInfo.taggs?.length > 0 && 
        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
          <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
            ТЕГИ
          </p>
          <Taggs taggs={userInfo.taggs} />
        </div> }

        <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
          <p className="ml-[17px] leading-4 text-[13px] uppercase font-sf-pro-display-400 tracking-wider">
            ССЫЛКИ
          </p>
          <Links isFirstMyLink={true} links={[userInfo.link, ...userInfo.links.slice(1)]} />
        </div>
      </div>
      {/* <CssTransitionNewChangeCard
        setChangingCardOpened={setChangingCardOpened}
        isChangingCardOpened={isChangingCardOpened}
        card={userInfo.profile.cards.find((card) => card.id === cardId)}
      /> */}

      {/* <CssTransitionedNewCardsPages
        setSlideOpened={setSlideOpened}
        setPhotoIndex={setPhotoIndex}
        setPhotos={setPhotos}
        setCardPageOpen={setCardPageOpen}
        setCardId={setCardId}
        isOpened={isPortfolioOpened}
        userInfo={me}
      /> */}

      {/* <CSSTransitionStatistikPage
        setStatistikClose={setStatistikOpened}
        userConfig={me}
        isStatisticOpened={isStatistikOpened}
      /> */}

      {/* <CssTransitionNewInnerCase
        setSlideOpened={setSlideOpened}
        setPhotoIndex={setPhotoIndex}
        setPhotos={setPhotos}
        userInfo={userInfo}
        card={userInfo.profile.cards.find((card) => card.id === cardId)}
        isOpened={isCardPageOpened}
      /> */}


    </>
  );
};

export default BaidgeWithProfile;
