import FirstBlock from "../../../components/First/FirstMain/FirstBlock";

const BaidgeAdvertisements = ({ advertisements, setPhotoIndex, setPhotos, setSlideActive }) => {
  return (
    <div className={`flex flex-col gap-[7px] mt-[15px]`}>
      <p className="leading-4 text-[13px] ml-[17px] text-[#84898F] uppercase font-sf-pro-display-400 tracking-wider">
        ЗАКАЗЫ
      </p>
      {advertisements.length > 0 ? (
        advertisements.map((e, i) => {
          return (
            <FirstBlock
              setPhotoIndex={setPhotoIndex}
              setPhotos={setPhotos}
              setSlideActive={setSlideActive}
              isFirst={true}
              index={i}
              isWatched={false}
              key={i}
              task={e}
              {...e}
              isButton={true}
              
            />
          );
        })
      ) : (
        <div className="h-[153px] bg-card rounded-[10px]  flex justify-center items-center">
          <p className="font-sf-pro-display-400 leading-5 text-[17.33px] text-white">
            Здесь появятся активные заказы{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default BaidgeAdvertisements;
