import { lazy, useEffect, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./css/Main.css";
import "./css/Fonts.css";
import "./css/Values.css";
import "./css/style.css";

// import { postEvent } from '@tma.js/sdk';
// import { initPopup } from '@tma.js/sdk';

import FirstMenu from "./pages/FirstMenu/FirstMenu";

import { fetchTon } from "./store/ton";
import { fetchUserInfo } from "./store/telegramUserInfo";
import { fetchMyOrders } from "./store/information";
import { Triangle } from "react-loader-spinner";
import { getCategorys, getSubCategorys } from "./store/categorys";
import { fetchAllShablons } from "./store/shablon";
import { fetchResponses } from "./store/responses";
import { fetchAllIds } from "./store/saves";
import MainButton from "./constants/MainButton";
import axios from "axios";

const First = lazy(() => import("./pages/First/First"));
const AdCreating = lazy(() => import("./pages/AdCreating"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Balance = lazy(() => import("./pages/Balance"));
const MyAds = lazy(() => import("./pages/MyAds/MyAds"));
const AllShablons = lazy(() => import("./pages/AllShablons/AllShablons"));
const SavedPage = lazy(() => import("./pages/SavedPage/SavedPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));

const MyLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
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

  const menuRef = useRef(null)

  useEffect( () => {
    if (location.pathname === "/AdCreating"){
      menuRef.current.classList.add("disappearAnimation")
      menuRef.current.classList.remove("appearAnimation")
      document.documentElement.style.overflowY = "auto"
    }
    else{
      document.documentElement.style.overflowY = "hidden"
      menuRef.current.classList.add("appearAnimation")
      menuRef.current.classList.remove("disappearAnimation")
    }
  } , [location.pathname] )

  
  return (
    <>
      <FirstMenu ref={menuRef} />
    <div className="container" style={{
      minHeight : "calc(100vh)"
    }}>
      <div
        style={isMenuActive ? { opacity: "0.6" } : { maxWidth: "0px" }}
        className="black"
      ></div>

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Suspense fallback={<MyLoader />}>
                <First />
              </Suspense>
            }
          />

          <Route
            path="/FirstPage"
            element={
              <Suspense fallback={<MyLoader />}>
                <First isPage={true} />
              </Suspense>
            }
          />

          <Route
            path="/ProfilePage"
            element={
              <Suspense fallback={<MyLoader />}>
                <ProfilePage />
              </Suspense>
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
                <Profile />
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
            path="/MyAds"
            element={
              <Suspense fallback={<MyLoader />}>
                <MyAds />
              </Suspense>
            }
          />


          <Route
            path="/ResponsePage"
            element={
              <Suspense fallback={<MyLoader />}>
                <MyAds isPage = {true} />
              </Suspense>
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
        </Routes>
      </AnimatePresence>
    </div>
    </>
  );
};
    
var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const en = true
function App() {

  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.disableVerticalSwipes();

  window.Telegram.WebApp.setHeaderColor("#18222d");
  window.Telegram.WebApp.setBackgroundColor("#18222d");

  const dispatch = useDispatch();

  window.Telegram.WebApp.expand();
  const me = useSelector((state) => state.telegramUserInfo);

  console.log("Привет")
  // useEffect( () => {
  //   async function dsa(){
  //     // await axios.get("https://back-birga.ywa.su/user/sendMessage", {
  //     //   params: {
  //     //     chatId: 2144832745,
  //     //     text:
  //     //     "Кто - то октрыл приложение",
  //     //     languageCode : en ? "en" : "ru"
  //     //   },
  //     // });
  //   }
  //   dsa()
  //   return() => {
  //     dsa()
      
  //   }
  // } , [])

  useEffect(() => {
    dispatch(fetchTon());
    dispatch(fetchUserInfo());
    dispatch(fetchMyOrders(1));
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(getCategorys());
    dispatch(getSubCategorys());
    dispatch(fetchAllShablons());
    dispatch(fetchAllIds())
    // dispatch(fetchAllValues());
  }, [dispatch]);







  // useEffect(() => {
  //   if (me.id !== "" && me) {
  //     dispatch(fetchResponses([me, 1]));
  //   }
  // }, [dispatch, me]);


  return (
    <BrowserRouter>
      <div className="UperContainer">
        <div className="MainContainer">
        
          <AnimatedSwitch />
          {/* <ModalChoicer /> */}
        </div>
      </div>
    </BrowserRouter>
    // Это ветка тестинг
    // Тут какое - то изменение
    // Тут огромное изменение
    );
}

export default App;
