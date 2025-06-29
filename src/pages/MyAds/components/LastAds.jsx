import { memo, useCallback, useEffect } from "react";

import Reaction from "./Reaction";
import { useDispatch } from "react-redux";
import formatDate from "../../../functions/makeDate";
import { postResponse } from "../../../store/responses";
import Text from "../../../components/Text/Text";
import MainButton from "../../../constants/MainButton";
import { useNavigate, useParams } from "react-router";
import useGetResponseById from "../../../hooks/useGetResponseById";
import CssTransitionSlider from "../../../components/UI/PhotosSlider/CssTransitionSlider";
import useSlider from "../../../hooks/useSlider";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import menuController from "../../../functions/menuController";
import useNavigateBack from "../../../hooks/useNavigateBack";
import Description from "../../../components/UI/Desription/Description";
import Links from "../../Baidge/components/Links";
import { SecondatyButton } from "../../../constants/SecondaryButton";
import { openLink } from "../../../functions/openLink";
import { useAddPageHistory } from "../../../hooks/useAddPageHistory";
const LastAds = ({isMyResponse = false}) => {

  const {responseId, advertisementId} = useParams();

  const dispatch = useDispatch();

  const {responseFromStore : response} = useGetResponseById({id : responseId, isMyResponse});

  const navigate = useNavigate();

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  useAddPageHistory();

  const goForward = useCallback( () => {
    if (!isSliderOpened){
      navigate(`/hold/${advertisementId}/${responseId}`)
    }
    else{
      setSlideOpened(false);
    }
  }, [advertisementId, responseId, navigate, setSlideOpened, isSliderOpened] );

  const openProfile = useCallback( () => {
    openLink(`https://t.me/${response.user.link}`)
  }, [response] )

  useEffect( () => {
    if (isSliderOpened){
      SecondatyButton.hide();
    }
    else{
      SecondatyButton.show();
    }
  }, [isSliderOpened] )

  useEffect( () => {
    if (!isMyResponse){
      if (response){
        if (response.isWatched !== "inProcess" && response.isWatched !== "completed"){
          menuController.lowerMenu();
          MainButton.show();
          MainButton.setText("Выбрать")
          MainButton.onClick(goForward)
          SecondatyButton.show();
          SecondatyButton.setText("Связаться");
          SecondatyButton.onClick(openProfile);
        }
      }
    }
    return () => {
      SecondatyButton.offClick(openProfile);
      SecondatyButton.hide();
      MainButton.offClick(goForward);
    }
  }, [response, isMyResponse, goForward, openProfile] )

  useEffect(() => {
    if (response){
      if (
        response.isWatched !== "watched" &&
        response.isWatched !== "inProcess"
        && response.isWatched !== "completed"
      ) {
        dispatch(postResponse(response.id));
      }
    }
    // eslint-disable-next-line
  }, [response]);

  const openAboutReactionFunc = () => {
    alert("Nothing")
  }
  useNavigateBack({isSliderOpened, setSlideOpened})

  if(!response){
    return <MyLoader />
  }
  return (
    <>
      <div  className={"connect-container flex flex-col gap-4"}>
        {/* <LastTop name = {name} photo = {photo} stage = {stage} openAboutReactionFunc={openAboutReactionFunc} /> */}
          <div className='fixed left-1/2 top-1/2' onClick={goForward}>MAIN</div>
        <Reaction
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSlideOpened={setSlideOpened}
          lastAds={true}
          blue={true}
          openAboutReactionFunc={openAboutReactionFunc}
          put={true}
          responce={response}
        />
        <Description nonText={"Отклик без текста"} text={response.information} />
        {response.user.links?.filter( (link) => link.length ).length ?  <div className="flex flex-col gap-[7px] w-[100%] text-[#84898f]">
            <p className="greyTitle">ССЫЛКИ</p>
            <Links user={response.user} isFirstMyLink={true} links={response.user.links}/>
        </div> : <></>}
        <div className="creationTimeBlock">
          <Text>Создано</Text>
          <p>{formatDate(new Date(response.createdAt))}</p>
        </div>
      </div>
      <CssTransitionSlider  
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
    </>
  );

  
};

export default memo(LastAds);
