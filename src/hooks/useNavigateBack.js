import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import BackButton from '../constants/BackButton';
import pagesHistory from '../constants/pagesHistory';

const useNavigateBack = ({isSliderOpened, setSlideOpened, isWorks = true}) => {
  const navigate = useNavigate();

  
  const goBack = useCallback( () => {
    if (isSliderOpened){
      setSlideOpened(false)
    }
    else{
      console.warn(pagesHistory);
      if (pagesHistory.length === 1){
        navigate('/', {replace : true});
      }
      else{
        pagesHistory.pop();
        navigate(-1)
      }
    }
  }, [isSliderOpened, setSlideOpened, navigate] )

  useEffect( () => {
    if (isWorks){
      BackButton.show();
      BackButton.onClick(goBack);
    }
    return () => {
      BackButton.offClick(goBack);
    }
  }, [goBack, isWorks] )
};

export default useNavigateBack;