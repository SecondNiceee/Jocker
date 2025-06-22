import  {  memo, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import FirstBlock from "./FirstBlock";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../UI/MyLoader/MyLoader";
import {  fetchTasksInformation, setPage } from "../../../store/information";
import translation from "../../../functions/translate";
const noWay = translation(" Нет таких предложений ")
const FirstMain = (
  (
    {
      ordersInformation,
      orderStatus,
      setPhotoIndex,
      setSlideActive,
      setPhotos
    }
  ) => {

  useLayoutEffect(() => {
    const savedScroll = localStorage.getItem('firstScroll');
    if (savedScroll !== null) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 0);
    }
    return () => {
      localStorage.setItem('firstScroll', String(window.scrollY));
    };
  }, []);

    const dispatch = useDispatch()

    const watchedArr = useSelector((state) => state.watchedAds.watchedAds);

    const page = useSelector(state => state.information.tasksPage);

    const elementRef = useRef(null);
    
    console.warn(ordersInformation);

    const getMore = useCallback(async () => {
      dispatch(fetchTasksInformation(page));
      dispatch(setPage(page + 1))
    }, [page, dispatch]);

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
    }, [ordersInformation]);
    return (
      <div  className="FirstMain">
        {ordersInformation.length === 0 && orderStatus === "all" ? (
          <h1 className="EmptyText">{noWay}</h1>
        ) : (
          ordersInformation.map((e, i) => {
            return (
              <FirstBlock
                isFirst={true}
                setPhotos={setPhotos}
                setPhotoIndex={setPhotoIndex}
                setSlideActive={setSlideActive}
                index={i}
                isWatched={watchedArr.includes(e.id) ? true : false}
                key={i}
                task={e}
                isButton={true}
              />
            );
          })
        )}

        {orderStatus !== "all" && (
          <MyLoader
            ref={elementRef}
            className="block"
            style={{
              width: "100%",
              height: "300px",
            }}
          />
        )}
      </div>
    );
  }
);

export default memo(FirstMain);
