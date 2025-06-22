import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import MainButton from "../../constants/MainButton";
import usePut from "../../hooks/MyAds/usePut";
import checkMistakes from "./utils/checkMistakes";
import menuController from "../../functions/menuController";
import useNavigateBack from "../../hooks/useNavigateBack";
import { getAdvertisementById } from "../../functions/api/getAdvertisemetById";
import { useDispatch, useSelector } from "react-redux";
import { setAdvertisement } from "../../store/information";
import EditAdvertisement from "../AdCreatingOne/ui/AdCreatingOne/EditAdvertisement";

const ChangeAdvertisement = () => {

  const { advId } = useParams();

  const advertisementFormStore = useSelector(state => state.information.advertisement);

  const dispatch = useDispatch();
  
  const [orderInformation, setOrderInformation] = useState();

  const putTask = usePut({ details: orderInformation });

  console.log(orderInformation);

  const navigate = useNavigate();

  const goForward = useCallback(async () => {
    if (checkMistakes(orderInformation)) {
      await putTask();
      dispatch(setAdvertisement(orderInformation));
      
      navigate(-1);
    }
  }, [putTask, orderInformation, navigate, dispatch]);

  useEffect(() => {
    async function setAdvertisementAsync() {
        if (advertisementFormStore){
            setOrderInformation({...advertisementFormStore, myAds : true})
            dispatch(setAdvertisement(advertisementFormStore))
        }
        else{
            const advertisement = await getAdvertisementById(advId);
            dispatch(setAdvertisement(advertisement))
            setOrderInformation({...advertisement, myAds : true  })
        }
    }
    setAdvertisementAsync();
  }, [advId, advertisementFormStore, dispatch]);

  useNavigateBack({});

  useEffect(() => {
    MainButton.show();
    MainButton.setText("Сохранить");
  }, []);

  useEffect(() => {
    MainButton.onClick(goForward);
    return () => {
      MainButton.offClick(goForward);
    };
  }, [goForward]);


  useEffect(() => {
    menuController.lowerMenu();
  }, []);

  const changeAdvertisement = useCallback( (par) => {
    console.warn(par);
    setOrderInformation(( value ) => ({...value ,...par}))
  }, [] )

  if (
    !orderInformation
  ) {
    return <MyLoader />;
  }
  return (
    <>
      <div
        onClick={goForward}
        className="fixed left-1/2 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer"
      >
        MAIN BUTTON
      </div>
      <EditAdvertisement 
      style={{
          paddingBottom: "74px",
        }}
        mistakes={{
          taskName: false,
        }}

        taskInformation={orderInformation}
        setTaskInformation={changeAdvertisement}
        MyInformation={true}

        />
      
    </>
  );
};

export default ChangeAdvertisement;
