import { memo, useCallback, useEffect, useState } from "react";
import DescriptionAndPhoto from "../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto";
import MakePrivate from "../../components/UI/MakePrivate/MakePrivate";
import { useDispatch, useSelector } from "react-redux";
import ShablinBlock from "./components/ShablonBlock/ShablinBlock";
import Block from "../../components/First/Block";
import MainButton from "../../constants/MainButton";
import translation from "../../functions/translate";
import useSlider from "../../hooks/useSlider";
import useNavigateBack from "../../hooks/useNavigateBack";
import { useNavigate, useParams } from "react-router";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import { showAllert } from "../../functions/showAlert";
import usePostResponse from "./hooks/usePostResponse";
import { getAdvertisementById } from "../../functions/api/getAdvertisemetById";
import { addMyLocalResponses, setDetailsAdvertisement } from "../../store/information";
import useAddHistory from "../../hooks/useAddHistory";
import DevelopmentMainButton from "../../components/UI/DevelopmentMainButton/DevelopmentMainButton";

const textPlace = translation("Почему задание должны дать именно вам")
const useTemplate = translation("Использовать шаблон")

const Responce = () => {
  const shablonsArr = useSelector((state) => state.shablon.shablonsArr);
  const [clearPhoto, setClearPhoto] = useState(1);
  const dispatch = useDispatch();
  const orderInformation = useSelector((state) => state.information.detailsAdvertisement);
  const { id } = useParams();
  useEffect(() => {
    function func() {
      setClearPhoto(clearPhoto + 1)
    }
    MainButton.onClick(func)
    return () => {
      MainButton.offClick(func)
    }
  }, [clearPhoto, setClearPhoto])
  useEffect(() => {
    if (!orderInformation) {
      getAdvertisementById(id)
        .then((advertisement) => {
          dispatch(setDetailsAdvertisement(advertisement));
        })
        .catch((err) => {
          // Можно обработать ошибку
        });
    }
  }, [id, orderInformation, dispatch])
  const [responce, setResponce] = useState({
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker: false,
  });
  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();
  useAddHistory();
  const postResponce = usePostResponse();
  const navigate = useNavigate();
  const goForward = useCallback(async () => {
    if (responce.text.length < 3) {
      showAllert("Ваш отклик пуст")
    } else {
      postResponce(responce, orderInformation);
      dispatch(addMyLocalResponses({ advertisement: { id: orderInformation.id } }))
      navigate(-2);
    }
  }, [responce, postResponce, dispatch, navigate, orderInformation])
  useEffect(() => {
    MainButton.onClick(goForward)
    return () => {
      MainButton.offClick(goForward);
    }
  }, [goForward])
  useNavigateBack({ isSliderOpened, setSlideOpened })
  if (!orderInformation) {
    return <MyLoader />
  }
  return (
    <>
      <div className="responce-wrapper">
        <DevelopmentMainButton goForward={goForward} />
        <Block setSliderOpened={setSlideOpened} task={orderInformation} setPhotoIndex={setPhotoIndex} setPhotos={setPhotos} />
        <MakePrivate

          isPrivate={responce.isShablon}
          setPrivate={() => {}}
          text={useTemplate}
          className={"responce-make-private opacity-50 "}
        />

        {responce.isShablon && (
          <ShablinBlock
            clearPhoto={clearPhoto}
            setClearPhoto={setClearPhoto}
            responce={responce}
            setResponce={setResponce}
            shablonsArr={shablonsArr}
          />
        )}
        {(shablonsArr.length > 0 || !responce.isShablon) &&
          <DescriptionAndPhoto
            clearPhoto={clearPhoto}
            className={"responce-descriprion"}
            text={responce.text}
            photos={responce.photos}
            textPlaceholder={textPlace}
            textTitle={"ТЕКСТ ОТКЛИКА"}
            setText={(e) => {
              setResponce({ ...responce, text: e });
            }}
            setPhotos={(e) => {
              setResponce((value) => ({ ...value, photos: e }));
            }}
          />
        }
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

export default memo(Responce);
