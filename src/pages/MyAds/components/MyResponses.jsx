import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import ResponseSuspense from "./ResponseSuspense";
import { useDispatch, useSelector } from "react-redux";
import {  fetchResponses } from "../../../store/responses";
import MyAnimation from "./MyAnimation";
import { useNavigate } from "react-router";
import { setAdvertisement, setResponse } from "../../../store/information";
const MyResponses = 
  ( 
    { responsesArr,text},
  ) => {
    const [page, setPage] = useState(2);
    const orderStatus = useSelector((state) => state.responses.status);
    const elementRef = useRef(null);
    const dispatch = useDispatch();
    const me = useSelector((state) => state.telegramUserInfo);

    const getMore = useCallback(async () => {
      if (me.id){
        dispatch(fetchResponses([me, page]));
        setPage(page + 1);
      }
    }, [page, setPage, dispatch, me]);

    const onIntersaction = useCallback(
      (entries) => {
        const firtEntry = entries[0];

        if (firtEntry.isIntersecting && orderStatus !== "all") {
          getMore();
        }
      },
      [orderStatus, getMore]
    );

    const navigate = useNavigate();

    useEffect(() => {
      const observer = new IntersectionObserver(onIntersaction);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line
    }, [responsesArr]);

    return (
      <div className="AdsContainer">
        {responsesArr.length === 0 ? (
          <MyAnimation text={text} />
        ) : (
          <>
            {responsesArr.map((e, i) => {
              
              const buttonFunction = () => {
                dispatch(setAdvertisement(e.advertisement))
                dispatch(setResponse(e))
                navigate(`/confirm/${e.advertisement.id}/${e.id}`)
              }
              return (
                <ResponseSuspense
                  func={buttonFunction}
                  index={i}
                  buttonText={"МОЙ ОТКЛИК"}
                  task={e}
                  isWatched={e.isWatched}
                  advertisement={e.advertisement}
                />
              );
            })}
          </>
        )}

        {orderStatus !== "all" && (
          <MyLoader
            ref={elementRef}
            style={{ height: "90px", marginLeft: "-16px" }}

          />
        )}
      </div>
    );
  };

export default MyResponses;
