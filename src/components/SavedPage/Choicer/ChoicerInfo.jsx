import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLottie } from "lottie-react";
import sleeping from "../../../animation/tired.json";
import cl from "./Choicer.module.css";
import FirstBlock from "../../First/FirstMain/FirstBlock";
import Reaction from "../../../pages/MyAds/components/Reaction";
import Case from "../../UI/Case/Case";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";
import { fetchSavedAdvertisements, fetchSavedCards, fetchSavedResponses } from "../../../store/saves";
import { fetchMyOrders } from "../../../store/information";

const ChoicerInfo = forwardRef(
  ({ text, arr, navigate, setDetails, setResponce, setCard }, ref) => {
    const orderStatus = useSelector((state) => state.saves.advertisementStatus);
    const cardStatus = useSelector((state) => state.saves.cardsStatus);
    const responsesStatus = useSelector((state) => state.saves.reponsesStatus);

    const isReady = useMemo(() => {
      if (navigate === "task") {
        return orderStatus === "complete";
      }
      if (navigate === "response") {
        return responsesStatus === "complete";
      }
      if (navigate === "card") {
        return cardStatus === "complete";
      }
    }, [orderStatus, cardStatus, responsesStatus, navigate]);

    const options = {
      animationData: sleeping,
      loop: true,
      style: {
        display: "flex",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        width: "250px",
      },
    };

    const openFunc = useCallback(
      (card) => {
        setCard({ isOpen: true, card: card });
      },
      [setCard]
    );

    const { View } = useLottie(options);

    const array = useMemo(() => {
      if (navigate === "task") {
        return arr.map((e, i) => {
          return (
            <FirstBlock
              index={i}
              setDetailsActive={setDetails}
              agree={true}
              isButton={true}
              className={cl.firstBlock}
              task={e}
              id={e.id}
              {...e}
            />
          );
        });
      }
      if (navigate === "response") {
        return arr.map((e, i) => {
          return <Reaction setOpen={setResponce} agree={true} responce={e} />;
        });
      }
      if (navigate === "card")
        return arr.map((e, i) => {
          return (
            <Case
              card={e}
              openFunc={openFunc}
              agree={true}
              task={e}
              title={e.title}
              description={e.description}
              photos={e.photos}
              watchOnly={true}
            />
          );
        });
    }, [arr, navigate, openFunc, setDetails, setResponce]);






    const elementRef = useRef(null)
    const dispatch = useDispatch()

    const [advertisementPage , setAdvertisementPage ] = useState(1)
    const [responsesPage , setResponsesPage] = useState(1)
    const [cardPage , setCardPage] = useState(1)

    const getMore = useCallback(async () => {
        if (navigate === "task"){
            dispatch(fetchSavedAdvertisements([advertisementPage]))
            setAdvertisementPage(advertisementPage + 1)
        }
        if (navigate === "response"){
            dispatch(fetchSavedResponses([responsesPage]))
            setResponsesPage(responsesPage + 1)
        }
        if (navigate === "card"){
            dispatch(fetchSavedCards([cardPage]))
            setCardPage(cardPage + 1)
        }
    }, [cardPage, responsesPage, advertisementPage, setAdvertisementPage, setCardPage, setResponsesPage, dispatch, navigate]);

    const onIntersaction = useCallback(
      (entries) => {
        const firtEntry = entries[0];

        if (firtEntry.isIntersecting && orderStatus !== "all") {
          getMore();
        }
      },
      [orderStatus, getMore]
    );


    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [arr]);





    const allStatus = useMemo( () => {
        switch (navigate){
            case "task":
                return orderStatus
            case "response":
                return responsesStatus
            case "card":
                return cardStatus
        }
    } , [navigate , orderStatus , responsesStatus, cardStatus] )


    return (
      <>
          <>
            <div
              ref={ref}
              style={arr.length > 0 ? { display: "none" } : {}}
              className={cl.choicerBlock}
            >
              <div
                onClick={() => {
                  window.Telegram.WebApp.openTelegramLink(
                    "https://t.me/addstickers/DonutTheDog"
                  );
                }}
                className="hamster"
              >
                {View}
              </div>
              <p className={cl.text}>{text}</p>
            </div>

            <div
              style={arr.length === 0 ? { display: "none" } : {}}
              className={cl.blocksWrapper}
            >
              {array}
              {allStatus !== "all" &&  <MyLoader ref={elementRef}  style = {{ height : "90px" , marginLeft : "-16px"}} />}
            </div>
          </>

      </>
    );
  }
);

export default memo(ChoicerInfo);
