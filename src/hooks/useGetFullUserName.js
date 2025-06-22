import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getFormatedUserFullName } from '../functions/getFormatedUserFullname';

const useGetFullUserName = () => {
    const userInfo = useSelector((state) => state.telegramUserInfo);
    const userName = useMemo( () => {
      return getFormatedUserFullName(userInfo.firstName, userInfo.lastName)
    }, [userInfo.firstName, userInfo.lastName] )
  
    
    return userName;
};

export default useGetFullUserName;