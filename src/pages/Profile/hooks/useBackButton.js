import { useEffect } from 'react';
import BackButton from '../../../constants/BackButton';
import { useNavigate } from 'react-router';

const useBackButton = ({changeActive, cardsActive}) => {
  const navigate = useNavigate();
  useEffect(() => { // Логика BackButton
    BackButton.show();
    function goBack() {
      navigate(-1);
    }
    if (cardsActive || changeActive) {
      BackButton.offClick(goBack);
    } else {
      BackButton.onClick(goBack);
    }
    return () => {
      BackButton.offClick(goBack);
    };
  });
};

export default useBackButton;