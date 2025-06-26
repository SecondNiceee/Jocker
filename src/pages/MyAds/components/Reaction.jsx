import { memo } from "react";


import "./../MyAds.css";
import UserIcon from "../../../components/UI/UserIcon/UserIcon";
import RatingText from "../../../components/UI/RatingText/RatingText";

const Reaction = ({
  setOpen,
  responce,
  setPhotos,
  setPhotoIndex,
  setSlideOpened,
}) => {


  // const openTelegrmaLink = useCallback(() => {
  //   if (responce.user.link && responce.user.link !== "-1") {
  //     window.Telegram.WebApp.openTelegramLink(
  //       "https://t.me/" + responce.user.link
  //     );
  //   } else {
  //     window.Telegram.WebApp.showPopup(
  //       {
  //         title: translation("Упс"),
  //         message: "Похоже, у пользователя закрытый профиль",
  //         buttons: [{ id: "save", type: "default", text: "Понятно" }],
  //       },
  //       (buttonId) => {
  //         if (buttonId === "save" || buttonId === null) {
  //           console.log("Ok");
  //         }
  //       }
  //     );
  //   }
  // }, [responce.user.link]);

  const imageOnClick = (index) => () => {
    setPhotos(responce.photos);
    setPhotoIndex(index);
    setSlideOpened(true);
  };


  return (
    <div onClick={setOpen} className="flex rounded-[10px_10px_13.33px_13.33px] flex-col bg-card">

        {responce.photos.length > 0 ? (
          <div className="flex gap-[6px] overflow-x-scroll rounded-[6.667px] mt-[3.67px] mr-[3.67px] ml-[3.67px]">
            {responce.photos.map((e, i) => (
              <img
                className="min-w-[183px] max-h-[134px] object-cover rounded-[6.667px]"
                onClick={imageOnClick(i)}
                style={responce.photos.length === 1 ? { width: "100%" } : {}}
                src={e}
                alt=""
                key={i}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      <div className="flex gap-[10.33px] mb-[12px] ml-[19px] mr-[16px] mt-[12px] items-center">
        <UserIcon small={true} user={responce.user} />
        <div className="flex flex-col gap-[2.33px]">
          <header className="flex items-center gap-[5px]">
            <p className="text-white font-sf-pro-display leading-[18.311px] text-[17.33px]">
              {responce.user.fl}
            </p>
            <RatingText user={responce.user} />
          </header>
          <p className="text-[#B5CED9] font-sf-pro-display-400 text-[14.667px] leading-[17.667px]">{responce?.user?.profession?.profession}</p>
        </div>
        <img className="ml-auto"  src={"/images/newProfile/leftArrow.svg"} alt="" />
      </div>
    </div>
  );
};

export default memo(Reaction);
