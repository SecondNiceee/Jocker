import React, { useEffect } from 'react';
import menuController from '../../../functions/menuController';

const useMenuController = ({isPortfolioOpened}) => {
    return (
        useEffect( () => {
            if (isPortfolioOpened){
                menuController.hideMenu();
            }
            else{
                menuController.showMenu();
            }
        } , [isPortfolioOpened]) 
    );
};

export default useMenuController;