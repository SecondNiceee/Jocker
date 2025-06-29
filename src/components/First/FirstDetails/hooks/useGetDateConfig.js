import formatDate from "../../../../functions/makeDate";

const defaultDate = new Date(0);
const useGetDateConfig = ({deadline}) => {
    return  [
        {
            text : formatDate(deadline.start, true),
            title : "Начать",
            show : deadline.start.getTime() !== defaultDate.getTime()
        },
        {
            text : formatDate(deadline.end, true),
            title : "Дедлайн",
            show : deadline.end !== ""
        }
    ].filter( (dateItem) => dateItem.show )
};

export default useGetDateConfig;