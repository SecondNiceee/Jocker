import { useMemo } from "react";

const useProfileStyle = ({cardsActive, changeActive}) => {
    const profileStyle = useMemo(() => {
        if (cardsActive || changeActive) {
        return {
            transform: "translate3d(-100vw , 0 , 0)",
        };
        }
        return {
        transform: "translate3d(0, 0, 0)",
        };
    }, [cardsActive, changeActive]);
    return profileStyle;
};

export default useProfileStyle;