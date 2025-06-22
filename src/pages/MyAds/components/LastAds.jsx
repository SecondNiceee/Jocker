import { memo, useCallback, useEffect } from "react";

import Reaction from "./Reaction";
import TextAboutMe from "../../../components/UI/AboutMeText/TextAboutMe";
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
const LastAds = ({isMyResponse = false}) => {

  const {responseId, advertisementId} = useParams();

  const dispatch = useDispatch();

  const {response, responseStatus} = useGetResponseById({id : responseId});

  const navigate = useNavigate();

  const goForward = useCallback( () => {
    navigate(`/hold/${advertisementId}/${responseId}`)
  }, [advertisementId, responseId, navigate] )

  useEffect( () => {
    if (!isMyResponse){
      if (response){
        if (response.isWatched !== "inProcess" && response.isWatched !== "completed"){
          menuController.lowerMenu();
          MainButton.show();
          MainButton.setText("Выбрать исполнителя")
          MainButton.onClick(goForward)
        }
      }
    }
  }, [response, isMyResponse, goForward] )

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

    const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  useNavigateBack({isSliderOpened, setSlideOpened})

  if(responseStatus === "pending" || response === null){
    return <MyLoader />
  }


  return (
    <>
    
      <div style={MainButton.isVisible ? {paddingBottom : "74px"} : {paddingBottom : "97px"} }  className={"last-ads"}>
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

        <TextAboutMe
          textareaClassName={"new-textarea"}
          style={{
            marginTop: "8px",
          }}
          aboutU={response.information}
        />

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
