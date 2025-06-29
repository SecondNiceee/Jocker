import {
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import "../MyAds/MyAds.css";
import AllTasks from "./AllTasks";
import { useSelector } from "react-redux";
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
  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );
  console.log(ordersInformation);
  const filters = useSelector(state => state.filters.advertisementsFilters);
  const [filterBy, setFilterBy] = useState("");
  const filteredArr = useFilteredArr(ordersInformation, filterBy);
  const filteredOrders = useFilteredArray({ filteredArr, filters });
  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();
  useAddHistory();
  console.log(filteredArr);
  console.log(filteredOrders);
  useAddPageHistory();
  useBlockInputs();



  useEffect(() => {
    const timer = setTimeout(hideMainButtonGarant, 200);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    menuController.showMenu();
    menuController.raiseMenu();
    BackButton.hide();
  }, []);
  useEffect(() => {
    const backHandler = () => isSliderOpened && setSlideOpened(false);
    BackButton.onClick(backHandler);
    isSliderOpened ? BackButton.show() : BackButton.hide();
    return () => BackButton.offClick(backHandler);
  }, [isSliderOpened, setSlideOpened]);
  useEffect(() => {
    if (isSliderOpened) {
      MainButton.show();
      MainButton.setText("Закрыть");
    } else {
      MainButton.hide();
    }
  }, [isSliderOpened]);
  return (
    <>
      <div className="first-container">
        <motion.div
          id="First"
          className="First"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="first-wrapper">
            <AllTasks
              setPhotos={setPhotos}
              setPhotoIndex={setPhotoIndex}
              setSlideActive={setSlideOpened}
              filters={filters}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              ordersInformation={filteredOrders}
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
