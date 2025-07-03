import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const useGetUserPhotoLink = ({anotherUserInfo = null}) => {
    
    const me = useSelector((state) => state.telegramUserInfo);
    const link = useMemo( () => {
        if (!me.id && !anotherUserInfo){
            return "/images/icons/non-user-icon.png"   
        }
        if (anotherUserInfo){
            if (!anotherUserInfo.photo || !anotherUserInfo.photo?.length){
                return "/images/icons/non-user-icon.png"
            }
            return anotherUserInfo.photo;
        }
        else{
            return me.photo;
        }
    }, [me, anotherUserInfo] )
    return link;
};

export default useGetUserPhotoLink;