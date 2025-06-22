import StarIcon from "../../../images/icons/Star.svg"
const FeedBacksInfo = ({feedbacks}) => {
    if (!feedbacks){
        return (<p className="text-[#969A9F] font-sf-pro-display-400 text-[17.33px]">Нет отзывов</p>)
    }
  return (
    <>
    {feedbacks.length ?  (<div className="flex items-center gap-[6.67px]">
      <div className="flex items-center gap-[5px]">
        <img alt="#" src={StarIcon} className="w-[15.94px] h-[15.23px]" />
        <p className="text-white font-sf-pro-display-400 text-[17.33px]">5.0</p>
      </div>
      <p className="text-[17.33px] font-normal font-sf-pro-display-400 text-[#DAF5FE]">
        (17)
      </p>
    </div> ) : <p className="text-[#969A9F] font-sf-pro-display-400 text-[17.33px]">Нет отзывов</p>}
    </>
  );
};

export default FeedBacksInfo;
