const ProfilesCounterOfWatches = ({watchesCounter, onClick = () => {}}) => {
    return (
        <div onClick={onClick} className="flex mt-[23px] flex-col !ml-[5px] mr-[3px] gap-[5px] my-auto">
        <h2 className="font-sf-pro-display-600 text-[17px] text-white leading-[18px]">
          {watchesCounter}
        </h2>
        <p className="font-sf-pro-display max-w-[70px] leading-[14.667px] tracking-wide text-[13px] !text-[#DAF5FE]">
          просмотров профиля
        </p>
      </div>
    );
};

export default ProfilesCounterOfWatches;