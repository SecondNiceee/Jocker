import { memo, useCallback, useEffect, useRef, useState } from "react";
import TaskDetailsContainer from "./TaskDetailsContainer";
import TimeAndWatches from "./TimeAndWatches";
import { useDispatch, useSelector } from "react-redux";
import { addWatch, setDetailsAdvertisement } from "../../../store/information";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { useNavigate, useParams } from "react-router";
import menuController from "../../../functions/menuController";
import MainButton from "../../../constants/MainButton";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";
import useNavigateBack from "../../../hooks/useNavigateBack";
import { getAdvertisementById } from "../../../functions/api/getAdvertisemetById";
import useIsMyResponse from "../../../pages/First/hooks/useIsMyResponse";
import { showAllert } from "../../../functions/showAlert";
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton";
import { disableColorButton } from "../../../functions/disableColorButton";
import { useAddPageHistory } from "../../../hooks/useAddPageHistory";
import { getRatingByProfession } from "../../../functions/api/getRatingByProfession";
import { getCommonRating } from "../../../functions/api/getCommonRating";
import { openLink } from "../../../functions/openLink";
import DevelopmentMainButton from "../../UI/DevelopmentMainButton/DevelopmentMainButton";
import { getUserWithoutCards } from "../../../functions/api/getUserWithoutCards";

const advertisementId =
  window.Telegram.WebApp.initDataUnsafe.start_param?.split("m")[0] || null;

const FirstDetails = ({
  end,
  sliderClassName,
  className,
  navigateBack = true,
  hideMenu,
  showButton = true,
  orderInformationParam = null,
  ...props
}) => {

  const disatch = useDispatch();

  const { id } = useParams();

  useAddPageHistory();

  const externalOrderInformation = useSelector(
    (state) => state.information.detailsAdvertisement
  );

  const [orderInformation, setOrderInformation] = useState(null);

  useEffect(() => {
    if (orderInformationParam) {
      setOrderInformation(orderInformationParam);
    } else {
      setOrderInformation(externalOrderInformation);
    }
  }, [orderInformationParam, setOrderInformation, externalOrderInformation]);

  const isFetchAdditionalInformation = useRef(false);

  useEffect(() => {
    async function fetchAdditionalInformation(params) {
      let commonRating = null;
      let ratingByProfession = null;
      await getCommonRating(orderInformation.user.id).then((rating) => {
        commonRating = rating;
      });
      await getRatingByProfession(orderInformation.user).then((rating) => {
        ratingByProfession = rating;
      });
      return { commonRating, ratingByProfession };
    }

    if (!isFetchAdditionalInformation.current) {
      if (orderInformation) {
        fetchAdditionalInformation().then((userAdditionalInformation) => {
          setOrderInformation((prev) => ({
            ...prev,
            user: { ...prev.user, ...userAdditionalInformation },
          }));
        });
        isFetchAdditionalInformation.current = true;
      }
    }
  }, [orderInformation]);

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  useEffect(() => {
    async function fetchUserAndRating() {
      let advertisement = null;
      if (advertisementId && !id) {
        advertisement = await getAdvertisementById(Number(advertisementId));
      } else {
        advertisement = await getAdvertisementById(Number(id));
      }
      const userWithRating = await getUserWithoutCards(advertisement.user.id);
      advertisement.user = userWithRating;
      disatch(setDetailsAdvertisement(advertisement));
    }
    if (
      !orderInformation &&
      showButton &&
      !orderInformationParam &&
      !externalOrderInformation
    ) {
      fetchUserAndRating().catch((err) => {
        showAllert("Не удалось загрузить задание.")
      })
    }
  }, [
    id,
    orderInformation,
    disatch,
    showButton,
    orderInformationParam,
    externalOrderInformation,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSliderOpened) {
      MainButton.setText("Закрыть");
    } else {
      if (showButton) {
        menuController.lowerMenu();
        MainButton.show();
        MainButton.setText("ОТКЛИКНУТЬСЯ");
      }
    }
  }, [showButton, isSliderOpened]);

  const { isMyResponse, isMyTask } = useIsMyResponse({
    detailsAdertisement: orderInformation,
  });

  useEffect(() => {
    if ((isMyResponse || isMyTask) && !isSliderOpened && showButton) {
      disableColorButton();
    }
    return () => {
      enableColorAndActiveButton();
    };
  }, [isMyResponse, isSliderOpened, isMyTask, showButton]);

  const me = useSelector( (state) => state.telegramUserInfo )
  const goForward = useCallback(() => {
    if (isSliderOpened) {
      setSlideOpened(false);
      return;
    }
    if (orderInformation.isOutSide ){
      if (!me.profession){
            window.Telegram.WebApp
            .showPopup({
              title: "🔓 Только с бейджем",
              message: "Чтобы откликнуться, необходимо сначала оформить бейдж исполнителя (это займет 2 минуты)",
              buttons: [
                { id: "create", type: "default", text: "Создать" },
                { id: "cancel", type: "destructive", text: "Отмена" },
              ],
            } , (buttonId) => {
              if (buttonId === "save" || buttonId === null) {  
                  navigate("/BaidgeCreating")
              }
            } )
      }
      else{
        if (orderInformation.outSideButtonUrl){
          openLink(orderInformation.outSideButtonUrl)
        }
        else{
          showAllert("На это задание нельзя откликнуться.")
        }
      }
      return;
    }
    if (isMyResponse) {
      showAllert("Вы уже откликнулись на это задание.");
    } else {
      if (isMyTask) {
        showAllert("Вы не можете откликаться на свои задания");
      } else {
        if (advertisementId) {
          navigate(`/makeresponse/${advertisementId}`);
        } else {
          if (id) {
            navigate(`/makeresponse/${id}`);
          } else {
            alert(
              "Не удалось откликнуться, возможно задание не активно или удалено"
            );
          }
        }
      }
    }
  }, [id, navigate, isMyResponse, orderInformation?.isOutSide, orderInformation?.outSideButtonUrl, isMyTask, isSliderOpened, me, setSlideOpened]);

  useEffect(() => {
    if (showButton) {
      menuController.hideMenu();
    }
  }, [showButton]);

  useEffect(() => {
    if (showButton) {
      MainButton.onClick(goForward);
    }
    return () => {
      MainButton.offClick(goForward);
    };
  }, [goForward, showButton]);

  useNavigateBack({ isSliderOpened, setSlideOpened, isWorks: navigateBack });

  useEffect(() => {
    if (!end && orderInformation) {
      disatch(addWatch(orderInformation));
    }
  }, [disatch, end, orderInformation]);

  if (!orderInformation) {
    return <MyLoader />;
  }
  return (
    <>
      <div
        {...props}
        className={
          className ? ["TaskDetails ", className].join(" ") : "TaskDetails"
        }
      >
        <DevelopmentMainButton goForward={goForward}  />
        <TaskDetailsContainer
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSliderOpened={setSlideOpened}
          end={end}
          isActive={true}
          orderInformation={orderInformation}
        />
        {end ? (
          <></>
        ) : (
          <TimeAndWatches
            responses={
              orderInformation.responces
                ? orderInformation.responces.length
                : null
            }
            time={orderInformation.creationTime}
            watches={orderInformation.viewsNumber}
          />
        )}
      </div>
      <CssTransitionSlider
        className={sliderClassName}
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

export default memo(FirstDetails);
