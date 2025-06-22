import  { useEffect } from 'react';
import { disableColorButton } from '../../../functions/disableColorButton';
import { enableColorAndActiveButton } from '../../../functions/enableColorAndActiveButton';
import { disableColorAndActiveButton } from '../../../functions/disableColorAndActiveButton';
import MainButton from '../../../constants/MainButton';
import BackButton from '../../../constants/BackButton';
import { useSelector } from 'react-redux';

const useButtonActiveAndColorController = ({isMyResponse, isDetailsActive, step, detailsAdertisement}) => {
    const address = useSelector((state) => state.telegramUserInfo.address);
    useEffect(() => {
        if (isDetailsActive.isOpen) {
          MainButton.show();
          BackButton.show();
          if (isMyResponse) {
            disableColorButton()
          } else {
            if (step === 0) {
              if (isDetailsActive.isOpen) {
                if (detailsAdertisement) {
                  if (detailsAdertisement.status === "active") {
                    enableColorAndActiveButton()
                  } else {
                    disableColorAndActiveButton()
                  }
                }
              }
            }
          }
        } else {
          BackButton.hide();
          MainButton.hide();
          enableColorAndActiveButton()
        }
      }, [
        isDetailsActive.isOpen,
        step,
        isMyResponse,
        detailsAdertisement,
        address,
      ]);
    
};

export default useButtonActiveAndColorController;