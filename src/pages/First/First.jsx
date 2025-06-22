import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import "../MyAds/MyAds.css";
import AllTasks from "./AllTasks";
import {useSelector } from "react-redux";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import useBlockInputs from "../../hooks/useBlockInputs";
import useAddHistory from "../../hooks/MyAds/useAddHistory";
import useSlider from "../../hooks/useSlider";
import useFilteredArray from "./hooks/useFilteredArray";
import BackButton from "../../constants/BackButton";
import menuController from "../../functions/menuController";
import MainButton from "../../constants/MainButton";
import { hideMainButtonGarant } from "../../functions/hideButtonGarant";
import { useAddPageHistory } from "../../hooks/useAddPageHistory";

const First = () => {

  const firstRef = useRef(null);

useEffect(() => {
  const timer = setTimeout(async () => {
    await hideMainButtonGarant();
  }, 200);
  return () => clearTimeout(timer);
}, []);

  useAddHistory();

  useEffect( () => {
    menuController.showMenu();
    menuController.raiseMenu();
    BackButton.hide();
  }, [] )

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  const filters = useSelector(state => state.filters.advertisementsFilters);

  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);

  const secFilteredArray = useFilteredArray({ filteredArr, filters });

  const me = useSelector( (state) => state.telegramUserInfo );
  console.warn(me);

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  useAddPageHistory();

  const forwardFunction = useCallback( () => {
    if (isSliderOpened){
        setSlideOpened(false);
    }
    else{
      console.log("Другая логика")
    }
  }, [isSliderOpened,setSlideOpened] )

  const backFunction = useCallback( () => {
    if (isSliderOpened){
      setSlideOpened(false);
    }
  }, [isSliderOpened, setSlideOpened] )

  useEffect( () => {
    BackButton.onClick(backFunction);
    if(isSliderOpened){
      BackButton.show();
    }
    else{
      BackButton.hide();
    }
    return() => {
      BackButton.offClick(backFunction)
    }
  }, [isSliderOpened, backFunction] )

  useEffect( () => {
    if (isSliderOpened){
      MainButton.show();
      MainButton.setText('Закрыть')
    }
    else{
      MainButton.hide();
    }
  }, [isSliderOpened, forwardFunction] )

  useBlockInputs();

  return (
    <>
      <div className="first-container">
        <motion.div
          // style={style}
          ref={firstRef}
          id="First"
          className="First"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="first-wrapper">
            <AllTasks
              setPhotos = {setPhotos}
              setPhotoIndex = {setPhotoIndex}
              setSlideActive = {setSlideOpened}
              filters={filters}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              ordersInformation={secFilteredArray}
            />
          </div>

        </motion.div>
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

export default First;
