import { useEffect } from 'react';
import pagesHistory from '../../constants/pagesHistory';

const useAddHistory = () => {
  useEffect(() => {
    return () => {
      pagesHistory.push("/");
    };
  }, []);
};

export default useAddHistory;