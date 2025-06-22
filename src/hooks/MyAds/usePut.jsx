import  { useCallback } from 'react';
import { putMyTask } from '../../store/information';
import sortFiles from '../../functions/sortFiles';
import { useDispatch } from 'react-redux';

const usePut = ({details}) => {
  const dispatch = useDispatch();
    const putTask = useCallback( async () => {

        let myFormData = new FormData();
        myFormData.append('title' , String(details?.taskName))
        myFormData.append('description' , String(details?.taskDescription))
        myFormData.append("deadline" , String(1))
        myFormData.append("startTime" , details?.time.start)
        myFormData.append("endTime" , details?.time.end)
  
        let files = sortFiles(details.photosNames ,  details.photos)
        
          for (let i = 0; i <  files.removedArr.length; i++){
            myFormData.append(`deleteFiles[${i}]` , files.removedArr[i])
          }
          for (let i = 0; i < files.addedArr.length ; i++){
            myFormData.append(`addFiles` , files.addedArr[i] )
          }
  
      return await dispatch(putMyTask([myFormData, details.id , details]))
      
    } , [details, dispatch] ) 
    return putTask
};

export default usePut;