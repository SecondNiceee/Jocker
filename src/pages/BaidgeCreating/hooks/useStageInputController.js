import { useCallback } from 'react'
import { formateAgeString } from '../../../functions/formateAgeString';
export const useStageInputController = ({setStage, stage}) => {
  
    const onBlurFunc = useCallback((e) => {
        e.target.value = formateAgeString(e.target.value)
      }, []);
  
      const onFocusFunc = useCallback((e) => {
        e.target.value = String(stage).split(" ")[0];
      }, []);
    
      const setValueFunc = useCallback((e) => {
        if (!isNaN(e)) {
          if (e.slice(0, 1) !== "0") {
            setStage(Number(e));
          } else {
            if (e !== "00") {
              setStage(Number(e.slice(1, 2)));
            } else {
              setStage(0);
            }
          }
        }
      }, [stage, setStage]);


    return {onBlurFunc, onFocusFunc, setValueFunc}
};
