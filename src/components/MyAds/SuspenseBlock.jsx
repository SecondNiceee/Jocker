import { memo, useCallback } from "react";
import Block from "../First/Block";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAdvertisement } from "../../store/information";


const SuspenseBlock = ({i , e}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const setDetailsActive = useCallback( () => {
        dispatch(setAdvertisement(e));
        navigate(`/advertisementResponses/${e.id}`);
    }, [dispatch, navigate, e] )
    return (
        <Block task={e} isButton={true} setDetailsActive={setDetailsActive} />
        // <Block e={e} i={i}/>
    );
};

export default memo(SuspenseBlock);