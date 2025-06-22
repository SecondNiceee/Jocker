import { memo, useMemo } from "react";
import FullPicker from "../../../components/UI/FullPicker/FullPicker";
import ModalChoicer from "../../../components/UI/ModalChoicer/ModalChoicer";
import { useSelector } from "react-redux";
import Text from "../../../components/Text/Text";
import translation from "../../../functions/translate";
const values = ["Я исполнитель", "Я заказчик"];
const keys = ["freelancer", "customer"];
const modalNamesOne = ["Все", "В работе", "Просмотренные", "Непросмотренные", "Завершенные"].map(e => translation(e))
const modalNamesTwo = ["Все" , "Активные" , "В работе" , "Завершенные"].map(e => translation(e))
const MyAdsBlock = ({  nowValue, setNowKey,  greyWidth , greyIntWidth, setOneValue, setTwoValue , valueOne , valueTwo  }) => {
  const me = useSelector(state => state.telegramUserInfo)
  const responses = useSelector(state => state.responses.responses)
  const advertisements = useSelector(state => state.information.myAdsArray)
  const finishedDeals = useMemo( () => {
    let rezult = String((me.deals + me.completedTasks.length) / (advertisements.length + responses.length) * 100 ).slice(0,2) + " %"
    return isNaN((me.deals + me.completedTasks.length) / (advertisements.length + responses.length) * 100) ? "0%" : rezult

  } , [advertisements,responses, me.completedTasks.length, me.deals] )
  return (
    <div className="MyAdsBlock">
      <div className="counter__block">
        <div className="number-of-transactions">
          <Text>{me.deals}</Text>
          <Text>Количество сделок</Text>
        </div>
        <div className="number-of-transactions">
          <Text>{finishedDeals}</Text>
          <Text>Завершенные сделки</Text>
        </div>
      </div>
      <div className="YourAds">
        <Text>Ваши объявления</Text>
        <ModalChoicer style = {nowValue === "customer" ? {display : "none"} : {}} values={["all" , "inProcess" , "watched" , "unWatched", "completed"]} names={modalNamesOne} value = {valueOne} setValue={setOneValue} defaultValue={"all"} />
        
        <ModalChoicer style = {nowValue === "customer" ? {} : {display : "none"}} values={["all" , "active", "inProcess" , "completed"]} names={modalNamesTwo} value = {valueTwo} setValue={setTwoValue} defaultValue={"all"} />
        
      </div>
      <div className="pick">
        <FullPicker
        GreyIntWidth={greyIntWidth}
        GreyWidth={greyWidth}
          className={"MyAds__FullPicker"}
          values={values}
          nowKey={nowValue}
          setNowKey={setNowKey}
          keys={keys}
        />
      </div>
    </div>
  );
};

export default memo(MyAdsBlock);
