import { useEffect } from 'react';


const menu = document.documentElement.querySelector(".FirstMenu");
const useMenuController = ({isDetailsActive}) => {
    useEffect( () => {
        if (isDetailsActive.isOpen){
            menu.classList.add("disappearAnimation");
            menu.classList.remove("appearAnimation");
        }
        else{
            menu.classList.add("appearAnimation");
            menu.classList.remove("disappearAnimation");
        }
    }, [isDetailsActive.isOpen] )
};

export default useMenuController;