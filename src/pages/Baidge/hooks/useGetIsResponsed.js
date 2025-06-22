import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getIsResponsed } from '../../../functions/api/getIsResponsed';

const useGetIsResponsed = ({consumerId}) => {
    const me = useSelector(state => state.telegramUserInfo);
    const [isResponsed, setIsResponsed] = useState(null);
    useEffect( () => {
        if (me.id){
            getIsResponsed(me.id, consumerId).then((val) => setIsResponsed(val));
        }
    }, [setIsResponsed, consumerId, me] );
    return {isResponsed}
};

export default useGetIsResponsed;