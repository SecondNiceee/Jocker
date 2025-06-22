
const useGetOrderStatistics = ({userConfig}) => {
    return [
        {
            title : "Завершённые заказы" ,
            text : userConfig.completedTasks
        },
        {
            title : "Безопасных сделок",
            text : userConfig.secureTask
        },
        {
            title : "Количество откликлов",
            text : userConfig.responsesCounter
        }
    ]

};

export default useGetOrderStatistics;