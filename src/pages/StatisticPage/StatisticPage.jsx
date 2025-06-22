import useNavigateBack from "../../hooks/useNavigateBack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import menuController from "../../functions/menuController";
import StatistikComponent from "../Baidge/components/StatistikComponent";
import useGetProfileStatistics from './hooks/useGetProfileStatistics';
import useGetOrderStatistics from "./hooks/useGetOrderStatistics";
import useAddHistory from "../../hooks/useAddHistory";


const StatisticPage = () => {  
  const userConfig = useSelector( (state) => state.information.baidgeUser );
  
  useNavigateBack({isSliderOpened : false, setSlideOpened : false});

  useAddHistory();
  
  useEffect( () => {
    menuController.hideMenu();
  }, [] )

  const profileStatisticConfig = useGetProfileStatistics({ userConfig });
  const orderStatistics = useGetOrderStatistics({userConfig})
  return (
    <div className="pt-[16px] transition-transform w-full px-[16px] pb-[16px] bg-[#18222d] flex flex-col">

      <div className="flex flex-col ml-[16px] gap-[2px]">
        <p className="font-sf-pro-display-600 text-[20px] text-white tracking-wider leading-normal">
          Статистика
        </p>
        <p className="font-sf-pro-display text-[17px] leading-[18.3px] text-[#b5ced9]">
          {userConfig.firstName} {userConfig.lastName}
        </p>
      </div>

    <StatistikComponent className={"mt-[12.8px]"} config={profileStatisticConfig} title={"Профиль"}  />

    <StatistikComponent className={"mt-[12.6px]"} config={orderStatistics} title={"Заказы"} />

    </div>
  );
};

export default StatisticPage;
