import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, transform } from "framer-motion";

import BackButton from "../../constants/BackButton";

import MainButton from "../../constants/MainButton";
import useListner from "../../hooks/useListner";
import AllTasks from "./AllTasks";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuActive } from "../../store/menuSlice";
import Responce from "./Responce";

let varStep = 0;
let isDetailsActiveVar = false;

const First = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(varStep);


  const [isDetailsActive, setDetailsActive] = useState({
    id: 0,
    isOpen: isDetailsActiveVar,
  });

  const [responce, setResponce] = useState({
    text: "",
    photos: [],
    name: "привет",
    isShablonModalActive: false,
    shablonIndex: 0,
    isShablon: false,
    shablonMaker : false,
  });

  useEffect(() => {
    // setStep(varStep)
    // setDetailsActive({...isDetailsActive , isOpen : isDetailsActiveVar})
    if (isDetailsActive.isOpen) {
      BackButton.show();
    }
  }, [isDetailsActive]);

  isDetailsActiveVar = isDetailsActive.isOpen;
  varStep = step;

  function closeDetails() {
    setDetailsActive({ ...isDetailsActive, isOpen: false });
  }

  function forward() {
    if (varStep === 0) {
      setStep(step + 1);
      varStep = step;
    }
  }
  useEffect(() => {
    function back() {
      if (responce.isShablonModalActive){
        setResponce({...responce, isShablonModalActive : false})
      }
      else{
        if (responce.shablonMaker){
          setResponce({...responce , shablonMaker : false})
        }
        else{

          if (step === 1) {
            setStep(step - 1);
          }
          if (step === 0) {
            closeDetails();
          }
        }
      }
    }

    MainButton.onClick(forward);
    BackButton.onClick(back);
    if (isDetailsActive.isOpen) {
      BackButton.show();
    } else {
      BackButton.hide();
      MainButton.hide();
    }
    return () => {
      MainButton.offClick(forward);
      BackButton.offClick(back);
    };
  });

  BackButton.hide();
  MainButton.hide();
  if (isDetailsActive.isOpen) {
    BackButton.show();
    MainButton.show();
  }
  if (step === 0) {
    MainButton.setText("ОТКЛИКНУТЬСЯ");
  }
  if (step === 1) {
    MainButton.setText("ОТКЛИКНУТЬСЯ");
  }

  const isMenuActive = useSelector((state) => state.menu.value);

  const setMenuActive = useCallback(
    (set) => {
      dispatch(changeMenuActive(set));
    },
    [dispatch]
  );

  const style = useMemo(() => {
    switch (step) {
      case 0:
        return {
          transform: "translateX(0%)",
        };
      case 1:
        return {
          transform: "translateX(-100%)",
        };
    }
  }, [step]);

  useListner({
    isMenuActive,
    setMenuActive,
    setDetailsActive,
    isDetailsActive,
  });

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  return (
    <motion.div
      style={isMenuActive ? { opacity: "0.3" } : {}}
      className="First"
      onClick={() => {
        if (isMenuActive) {
          setMenuActive(false);
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, duration: 0 }}
    >
      <div className="first-wrapper" style={style}>
        <button
          onClick={forward}
          style={{
            zIndex: "1000",
            position: "fixed",
            left: 20,
            top: 20,
          }}
        >
          ДАЛЕЕ
        </button>
        <AllTasks
          ordersInformation={ordersInformation}
          isDetailsActive={isDetailsActive}
          setDetailsActive={setDetailsActive}
          setMenuActive={setMenuActive}
          isMenuActive={isMenuActive}
        />

        <Responce
          responce = {responce}
          setResponce = {setResponce}
          MainButton={MainButton}
          orderInformation={ordersInformation[isDetailsActive.id]}
        />
      </div>
    </motion.div>
  );
};

export default First;
