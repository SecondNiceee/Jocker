import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const useGetUserPhotoLink = ({anotherUserInfo = null}) => {
    
    const me = useSelector((state) => state.telegramUserInfo);
    const link = useMemo( () => {
        if (!me.id || !anotherUserInfo){
            return ""   
        }
        if (anotherUserInfo){
            return anotherUserInfo.photo;
        }
        else{
            return me.photo;
        }
    }, [me, anotherUserInfo] )
    return link;
};

export default useGetUserPhotoLink;