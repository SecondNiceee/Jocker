import { useCallback, useEffect } from 'react';
import pagesHistory from '../../../constants/pagesHistory';
import BackButton from '../../../constants/BackButton';
import { useNavigate } from 'react-router';

const useBackHandler = () => {
  const navigate = useNavigate();
  const goBack = useCallback( () => {
    if (pagesHistory[pagesHistory.length-1] === "/BaidgeCreating"){
      navigate(-2);
    }
    else{
      navigate(-1);
    }
  }, [navigate] )

  useEffect( () => {
    BackButton.show();
    BackButton.onClick(goBack)
    return () => {
      BackButton.offClick(goBack);
    }
  }, [goBack] )
};

export default useBackHandler;