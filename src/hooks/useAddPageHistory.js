import { useEffect } from "react";
import { useLocation } from "react-router"
import pagesHistory from "../constants/pagesHistory";

export const useAddPageHistory = () => {
    const location = useLocation();
    useEffect( () => {
        if (pagesHistory[pagesHistory.length-1] !== location.pathname){
            pagesHistory.push(location.pathname);
        }
        // eslint-disable-next-line
    } , [])
}