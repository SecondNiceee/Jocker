import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import GreyText from "../../../components/UI/GreyText/GreyText";
import cl from "../index.module.scss";
import WithdrawalCap from "./WithdrawalCap";
import CreateInput from "../../../components/UI/CreateInput/CreateInput";
import Compact from "./Compact";
import InformationBlock from "./InformationBlock";
import BalanceBlock from "./BalanceBlock";
import RoundedBlocks from "./RoundedBlocks";
import MainButton from "../../../constants/MainButton";
import BackButton from "../../../constants/BackButton";
import axios from "axios";
const WithdrawalPage = ({balance, setWithDrawal}) => { 



  useEffect( () => {
    async function buttonFunction(){
      MainButton.showProgress()
      try{
        console.log("1392120153", myValues.address, String(myValues.summ.replace(',', '.')) );
        
        const reposnse = await axios.get('https://www.connectbirga.ru/user/sendToAddress', {
          params : {
            fromId : 1392120153,
            toAddress : myValues.address,
            amount: String(myValues.summ.replace(',', '.'))
          }
        })
        
        MainButton.hideProgress()
        window.Telegram.WebApp.showPopup(
          {
            title: "Вывод в пути.",
            message: "Ваш тоны поступят на ваш баланс в течении нескольких минут.",
            buttons: [
              { id: "save", type: "default", text: "Понятно" },
            ],
          },
          (buttonId) => {
            if (buttonId === "save" || buttonId === null) {
              setWithDrawal(false)
            }
          }
        );
      }
      catch(e){
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
        setMistakes((value) => ({...value , address : true}))
      }

    }
    MainButton.show()
    MainButton.setText("ВЫВЕСТИ")

    MainButton.onClick(buttonFunction)
    return () => {
      MainButton.hide()
      MainButton.offClick(buttonFunction)
    }
  } , [myValues.address, setWithDrawal] )
  
  const [myValues, setMyValues] = useState({
    address: "",
    summ: "0",
  });
  const [mistakes, setMistakes] = useState({
    address : false,
    summ : false
  })
  const valuesChanger = useCallback((e) => {
    setMyValues((value) => ({ ...value, address: e }));
  }, []);

  useEffect( () => {
    MainButton.showProgress()
    function timeoutFunction(){
      setMistakes((value) => ({...value, summ : true}))
      MainButton.hideProgress()
      MainButton.setParams({
        is_active: false, //неизвесетно
        color: "#2f2f2f",
        text_color: "#606060",
      });
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error")
    }
    let timeout
    if (Number(myValues.summ.replace(',', '.')) > balance){
       timeout = setTimeout( timeoutFunction, 2000 )
    }
    else{
      MainButton.hideProgress()
      MainButton.setParams({
        color: "#2ea5ff",
        text_color: "#ffffff",
        is_active: true,
      });
      setMistakes( (value) => ({...value, summ : false}) )
    }
    return () => {

        clearTimeout(timeout)
      
    }
  } , [myValues.summ] )


  return (
    <>
    <div className={cl.withDrawal}>
      <WithdrawalCap />

      <Compact
        isGreyRed = {true}
        inputMistake = {mistakes.address}
        greyText={"Адрес"}
        inputPlaceholder={"Введите адрес кошелька"}
        inputType={"text"}
        inputValue={myValues.address}
        onChange={valuesChanger}
        
      />

    <InformationBlock  />


    <BalanceBlock inputMistake = {mistakes.summ} balance={balance} setMyValues={setMyValues} summ={myValues.summ} />



      <RoundedBlocks summ={myValues.summ} />
    </div>
    </>
  );
};

export default memo(WithdrawalPage);
