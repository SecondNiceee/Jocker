import { lazy, useEffect, Suspense, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import axios from "axios";

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";
import "./scss/Profile/_Profile.scss";
import "./scss/main.scss";
import "./css/index.css";

// import { postEvent } from '@tma.js/sdk';
// import { initPopup } from '@tma.js/sdk';

import FirstMenu from "./pages/FirstMenu/FirstMenu";

import { fetchTon } from "./store/ton";
import { fetchUserInfo } from "./store/telegramUserInfo/thunks/fetchUserInfo";
import { Triangle } from "react-loader-spinner";
import { getCategorys, getSubCategorys } from "./store/categorys";
import { fetchAllShablons } from "./store/shablon";

import { fetchAllIds } from "./store/saves";

import { getBalance } from "./store/balance";
import FirstDetails from "./components/First/FirstDetails/FirstDetails";
import ShowMyResponse from "./components/MyAds/ShowMyResponse/ShowMyResponse";
import ChangeAdvertisement from "./pages/ChangeAdvertisement/ChangeAdvertisement";
import LastAds from "./pages/MyAds/components/LastAds";
import AboutOne from "./pages/MyAds/components/AboutOne";
import Responce from "./pages/First/Responce";
import NewInnerCase from "./pages/NewInnerCase/NewInnerCase";
import Baidge from "./pages/Baidge/Baidge";
import AdCreatingThree from "./pages/AdCreatingThree/AdCreatingThree";
import Feedbacks from "./pages/Feedbacks/ui/Feedbacks";
import AppLayout from "./layouts/AppLayout";
import { isIphone } from "./functions/isIphone";
import ChoiceCategory from "./pages/AdCreatingOne/ui/components/ChoiceCategory/ChoiceCategory";
import ChoiceSubCategory from "./pages/AdCreatingOne/ui/components/ChoiceCategory/ChoiceSubCategory";

const NewChangeCard = lazy( () => import('./pages/NewChangeCard/NewChangeCard') )
const HappyPage = lazy(() => import("./pages/HappyHold/HappyPage"));
const   First = lazy(() => import("./pages/First/First"));
const AdCreating = lazy(() => import("./pages/AdCreating"));
const NewProfile = lazy(() => import("./pages/Profile/NewProfile"));
const Balance = lazy(() => import("./pages/Balance"));
const MyAds = lazy(() => import("./pages/MyAds/MyAds"));
const AllShablons = lazy(() => import("./pages/AllShablons/AllShablons"));
const SavedPage = lazy(() => import("./pages/SavedPage/SavedPage"));
const FirstChoiceCategory = lazy( () => import("./pages/AdCreatingOne/ui/components/ChoiceCategory/FirstChoiceCategory") )
const FirstChoiseSubCategory = lazy( () => import("./pages/AdCreatingOne/ui/components/ChoiceCategory/FirstChoiceSubCategory") )


const BaidgeCreating = lazy(() =>
  import("./pages/BaidgeCreating/BaidgeCreating")
);
const NewCardsPage = lazy( () => import("./pages/NewCardsPage/NewCardsPage") )

const StatisticPage = lazy( () => import("./pages/StatisticPage/StatisticPage") )



export const API_KEY = process.env.REACT_APP_API_KEY;

const MyLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <Triangle
        visible={true}
        height="80"
        width="80"
        color="white"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

const AnimatedSwitch = () => {
  const location = useLocation();
  const isMenuActive = useSelector((state) => state.menuSlice.value);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const congratulate = useSelector(
    (state) => state.telegramUserInfo.congratulate
  );
  const userId = useSelector((state) => state.telegramUserInfo.id);

  const [showCongradulate, setShowCongradulate] = useState(true);

  useEffect(() => {
    if (congratulate && congratulate.length > 0 && showCongradulate) {
      navigate("/HappyPage");
    }
  }, [congratulate, navigate, showCongradulate]);

  useEffect(() => {
  window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    async function makeUserVisit(params) {
      try {
        await axios.put(
          `${process.env.REACT_APP_HOST}/user/visit`,
          {},
          {
            params: {
              userId: String(userId),
            },
            headers: {
              "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
          }
        );
      } catch (e) {
        console.warn(e);
      }
    }
    if (userId) {
      makeUserVisit();
    }
  }, [userId]);

  return (
    <>
      <FirstMenu ref={menuRef} />
      <div
        className="container"
      >
        <div
          style={isMenuActive ? { opacity: "0.6" } : { maxWidth: "0px" }}
          className="black"
        ></div>

        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route element = {<AppLayout />}>
            
              <Route
                path="/changeAdvertisement/:advId"
                element={
                    <ChangeAdvertisement />
                }
              />



              <Route
                path="/responsedAdvertisement/:id"
                element={
                    <FirstDetails showButton = {false} />
                }
              />

              <Route
                path="/changeCard/:id"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewChangeCard isNewCard={false} />
                  </Suspense>
                }
              />

              <Route
                path="/taskCreationCategory"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <ChoiceCategory />
                  </Suspense>
                }
              />

              <Route
                path="/taskCreationSubCategory"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <ChoiceSubCategory />
                  </Suspense>
                }
              />

              <Route
                path="/cardCreation"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewChangeCard isNewCard={true} />
                  </Suspense>
                }
              />

              <Route
                path="/confirm/:advId/:resId"
                element={
                    <ShowMyResponse />
                }
              />

              <Route
                path="/feedbacks/:userId"
                element={
                    <Feedbacks />
                }
              />


              <Route
                path="/response/:advertisementId/:responseId"
                element={
                    <LastAds />
                }
              />

              <Route
                path="/firstchoicecategory"
                element = {
                  <Suspense fallback={<MyLoader />}>
                    <FirstChoiceCategory />
                  </Suspense>
                }
              />

              <Route
                path="/firstchoicesubcategory"
                element = {
                  <Suspense fallback={<MyLoader />}>
                    <FirstChoiseSubCategory />
                  </Suspense>
                }
              />

              <Route
                path="/hold/:advertisementId/:responseId"
                element={
                    <AdCreatingThree />
                }
              />
              
              <Route
                path="/"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <First />
                  </Suspense>
                }
              />



              <Route
                path="/cardsPage"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewCardsPage />
                  </Suspense>
                }
              />

              <Route
                path="/cardsPage/:userId"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewCardsPage />
                  </Suspense>
                }
              />

              <Route
                path="/card/:cardId/:userId"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewInnerCase />
                  </Suspense>
                }
              />

              <Route
                path="/card"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewInnerCase />
                  </Suspense>
                }
              />

              <Route
                path="/statistik"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <StatisticPage />
                  </Suspense>
                }
              />

              <Route
                path="/advertisementResponses/:advId"
                element={
                    <AboutOne />
                }
              />

              <Route
                path="/BaidgeCreating"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <BaidgeCreating />
                  </Suspense>
                }
              />


              <Route
                path="/BaidgeChanging"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <BaidgeCreating isChanging = {true} />
                  </Suspense>
                }
              />


              <Route
                path="/FirstDetails/:id"
                element={
                    <FirstDetails isPage={true} />}
              />


              <Route
                path="/FirstDetails"
                element={
                    <FirstDetails isPage={true} />}
              />

              <Route
                path="/Baidge"
                element={
                    <Baidge />
                }
              />

              <Route
                path="/Baidge/:id"
                element={
                    <Baidge />
                }
              />

              <Route
                path="/ExternalBaidge"
                element={
                    <Baidge isExternal = {true} />
                }
              />

              <Route
                path="/savedPage"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <SavedPage />
                  </Suspense>
                }
              />

              <Route
                path="/AdCreating"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <AdCreating />
                  </Suspense>
                }
              />

              <Route
                path="/Profile"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <NewProfile />
                  </Suspense>
                }
              />

              <Route
                path="/Balance"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <Balance />
                  </Suspense>
                }
              />

              <Route
                path="/HappyPage"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <HappyPage
                      setShowCongradulate={setShowCongradulate}
                      congradulate={congratulate}
                      task={
                        congratulate ? congratulate[congratulate.length - 1] : []
                      }
                    />
                  </Suspense>
                }
              />
              <Route
                path="/MyAds"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <MyAds />
                  </Suspense>
                }
              />


              <Route
                path="/makeresponse/:id"
                element={
                    <Responce />
                }
              />


              <Route
                path="/AllShablons"
                element={
                  <Suspense fallback={<MyLoader />}>
                    <AllShablons />
                  </Suspense>
                }
              />
            </Route>
            
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};
function App() {

  useEffect( () => {
    window.Telegram.WebApp.setHeaderColor("#18222d");
    window.Telegram.WebApp.setBackgroundColor("#18222d");
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.ready(); 
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.disableVerticalSwipes();
    try{
      if (isIphone()){
        window.Telegram.WebApp.requestFullscreen() 
      }
      else{
        window.Telegram.WebApp.exitFullscreen()
      }
    }
    catch(e){
      
    }
  }, [] )


  const dispatch = useDispatch();

  const address = useSelector((state) => state.telegramUserInfo.address);

  window.Telegram.WebApp.ready();

  window.Telegram.WebApp.expand();

  useEffect(() => {
    dispatch(fetchTon());
    dispatch(fetchUserInfo());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(fetchAllShablons());
    dispatch(fetchAllIds());
    // dispatch(fetchAllValues());
  }, [dispatch]);


  useEffect(() => {
    if (address) {
      dispatch(getBalance({ userAddress: address }));
    }
  }, [address, dispatch]);

  return (
    <BrowserRouter basename="/">
      <div className="UperContainer">
        <div className="MainContainer">
          <AnimatedSwitch />
          {/* <ModalChoicer /> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
