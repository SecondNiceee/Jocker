import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Text from "../../../../components/Text/Text";
import "../../../../scss/main.css";
import { getFormatedUserFullName } from "../../../../functions/getFormatedUserFullname";
import useGetUserPhotoLink from "../../../../hooks/useGetUserPhotoLink";

const ProfileCup = ({gotenUserInfo}) => {
  const me = useSelector((state) => state.telegramUserInfo);
  const [userInfo, setUerInfo] = useState(null);
  const userLink = useGetUserPhotoLink({anotherUserInfo : userInfo});
  useEffect( () => {
    if (gotenUserInfo){
      setUerInfo(gotenUserInfo)
    }
    else{
      setUerInfo(me);
    }
  } , [gotenUserInfo, me] )
  if (!userInfo){
    return null;
  }
  return (
    <div className="flex flex-col w-[100%] items-center justify-center">
      <img
        style={{ objectFit: "cover" }}
        src={userLink}
        className="profile__icon icon"
        alt=""
      />

      <Text className="urName" id="Name">
        {getFormatedUserFullName(gotenUserInfo.fl, "") }
      </Text>
    </div>

  );
};

export default ProfileCup;
