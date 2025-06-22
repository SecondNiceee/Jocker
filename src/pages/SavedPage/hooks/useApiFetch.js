import { useDispatch } from 'react-redux';
import pagesHistory from '../../../constants/pagesHistory';
import { clearAll, fetchSavedAdvertisements, fetchSavedCards, fetchSavedResponses } from '../../../store/saves';
import { useEffect } from 'react';

const useApiFetch = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSavedAdvertisements([1]))
        dispatch(fetchSavedCards([1]))
        dispatch(fetchSavedResponses([1]))
        return () => {
          pagesHistory.push("/SavedPage");
          dispatch(clearAll())
        };
      }, [dispatch]);
};

export default useApiFetch;