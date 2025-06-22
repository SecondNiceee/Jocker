import { useDispatch, useSelector } from 'react-redux';
import EditAdvertisement from './EditAdvertisement';
import { useCallback } from 'react';
import { setFirstPage } from '../../../../store/taskCreating';

const AdCreatingOne = ({
    MyInformation,
    className,
    errorName,
    mistakes
}) => {
    
  const dispatch = useDispatch();
  const setTaskInformation = useCallback((par) => {
    dispatch(setFirstPage(par))
    }, [dispatch])

   const taskInformation = useSelector( (state) => state.taskCreating.firstPage );
    return (
        <EditAdvertisement MyInformation={MyInformation} className={className} errorName={errorName} mistakes={mistakes}
        setTaskInformation={setTaskInformation} taskInformation={taskInformation}  />
    );
};

export default AdCreatingOne;