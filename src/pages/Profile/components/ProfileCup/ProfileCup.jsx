import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userPhoto from "../../../../images/userPhoto/user.png";
import Text from "../../../../components/Text/Text";
import "../../../../scss/main.css";
import { getFormatedUserFullName } from "../../../../functions/getFormatedUserFullname";

const ProfileCup = ({gotenUserInfo}) => {
  const me = useSelector((state) => state.telegramUserInfo);
  const [userInfo, setUerInfo] = useState(null);
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
        src={
          userInfo.photo.length > 0
            ? userInfo.photo.split("https://").length === 2
              ? userInfo.photo  
              : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}`
            : userPhoto
        }
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
