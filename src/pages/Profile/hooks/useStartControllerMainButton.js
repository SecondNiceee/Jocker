import { useEffect } from 'react';
import MainButton from '../../../constants/MainButton';
import pagesHistory from '../../../constants/pagesHistory';

const useStartControllerMainButton = () => {
    useEffect( () => {
        MainButton.hide()
        return () => {
          if (pagesHistory[pagesHistory.length - 1] === "/AdCreating"){
            MainButton.hide()
          }
        }
      } , [] )
};

export default useStartControllerMainButton;