import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useGetUserName = () => {

  const userInfo = useSelector((state) => state.telegramUserInfo);
  const userName = useMemo( () => {
    return userInfo.firstName.length > 22
    ? userInfo.firstName.slice(0, 22) + ".."
    : userInfo.firstName;
  }, [userInfo.firstName] )

  
  return userName;

};

export default useGetUserName;