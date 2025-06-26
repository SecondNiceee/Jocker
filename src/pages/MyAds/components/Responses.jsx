import { memo, useCallback, useEffect, useRef, useState } from "react";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";
import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../../../components/UI/MyLoader/MyLoader";
import MyAnimation from "./MyAnimation";
import Text from "../../../components/Text/Text";
import { useNavigate } from "react-router";
import Reaction from "./Reaction";
import { setResponse } from "../../../store/information";

const height = { height: "calc(calc(100vh) - 330px)" };
const Responses = ({
  setFilterBy,
  responces,
  values,
  names,
  getMore,
  setPhotos,
  setPhotoIndex,
  setSlideOpened
}) => {
  const [page, setPage] = useState(2);
  const orderStatus = useSelector(
    (state) => state.responses.responsesByAStatus
  );
  const elementRef = useRef(null);
  const onIntersaction = useCallback(
    (entries) => {
      const firtEntry = entries[0];

      if (firtEntry.isIntersecting && orderStatus !== "all") {
        getMore(page, setPage);
      }
    },
    [orderStatus, getMore, page, setPage]
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
  }, [responces]);

  const navigate = useNavigate();

  const advertisement = useSelector(state=>state.information.advertisement)

  const dispatch = useDispatch();

  return (
    <>
      <div  className="responses__up-block">
        <Text>Отклики</Text>
      <ModalChoicer
        setValue={(value) => {
          setFilterBy(value);
        }}
        className={"MyAds-choicer"}
        values={values}
        names={names}
        defaultValue={values[0]}
      />
      </div>

      {responces.length > 0 ? (
        <>
          {responces.map((e, i) => {
            const setOpen = () => {
              dispatch(setResponse(e));
              console.warn(e);
              navigate(`/response/${advertisement.id}/${e.id}`)
            }
            return (
                <Reaction
                  setPhotos = {setPhotos}
                  setPhotoIndex = {setPhotoIndex}
                  setSlideOpened = {setSlideOpened}
                  responce={e}
                  setOpen={setOpen}
                />
            );
          })}
        </>
      ) : (
        <MyAnimation style={height} text="Нет откликов на задание" />
      )}

      {orderStatus !== "all" && (
        <MyLoader
          ref={elementRef}
          style={{ height: "90px", marginLeft: "-16px" }}
        />
      )}
    </>
  );
};

export default memo(Responses);
