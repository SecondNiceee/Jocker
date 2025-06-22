import { useSelector } from 'react-redux';
import userPhoto from "../images/userPhoto/user.png";
import { useMemo } from 'react';

const useGetUserPhotoLink = ({anotherUserInfo = null}) => {
    const me = useSelector((state) => state.telegramUserInfo);
    const link = useMemo( () => {
    
        if (!me.id && !anotherUserInfo){
            return ""
        }
        const userInfo = anotherUserInfo ?? me
        return userInfo.photo.length > 0 ? userInfo.photo.split('https://').length === 2 ? userInfo.photo : `${process.env.REACT_APP_HOST}/${userInfo.id}/${userInfo.photo}` : userPhoto
    }, [me, anotherUserInfo] )
    return link;
};

export default useGetUserPhotoLink;