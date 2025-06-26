const IsNeededToFill = ({isNededToFill}) => {
    if (isNededToFill){
        return (
        <div className="bg-[#2EA5FF] px-[4px] rounded-[4.333px] items-center">
            <p className="font-sf-pro-rounded text-[11.228px] tracking-[0.337px] leading-[16.53px] uppercase text-white">Заполните</p>
        </div>
        );
    }
    return null;
};

export default IsNeededToFill;