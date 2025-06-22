import  { useEffect } from 'react';
import { useLocation } from 'react-router';
import pagesHistory from '../constants/pagesHistory';

const useAddHistory = () => {
    const location = useLocation();
    useEffect( () => {
        pagesHistory.push(location.pathname);
    }, [location.pathname] )
};

export default useAddHistory;