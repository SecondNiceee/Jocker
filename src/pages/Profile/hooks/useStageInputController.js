import { useCallback } from 'react';
import en from '../../../constants/language';
import translation from '../../../functions/translate';

const lett = translation("лет");
const goda = translation("года");
const god = translation("год");

export const useStageInputController = ({setAboutU, aboutU}) => {
    const onBlurFunc = useCallback((e) => {
        let numb = Number(
          e.target.value.slice(e.target.value.length - 1, e.target.value.length)
        );
    
        if (e.target.value === "") {
          if (en) {
            setAboutU((value) => ({ ...value, stage: `0 years` }));
          } else {
            setAboutU((value) => ({ ...value, stage: `0 ${lett}` }));
          }
        }
    
        if (en) {
          if (Number(e.target.value) === 1) {
            e.target.value += " year";
          } else {
            e.target.value += " years";
          }
        } else {
          if (Number(e.target.value) > 10 && Number(e.target.value) < 20) {
            e.target.value += ` ${lett}`;
          } else {
            if (numb > 1 && numb < 5) {
              e.target.value += ` ${goda}`;
            } else {
              if (numb === 1) {
                e.target.value += ` ${god}`;
              } else {
                e.target.value += ` ${lett}`;
              }
            }
          }
        }
      }, [setAboutU]);
    
      const onFocusFunc = useCallback((e) => {
        e.target.value = String(aboutU).split(" ")[0];
      }, [aboutU]);
    
      const setValueFunc = useCallback((e) => {
        if (!isNaN(e)) {
          if (e.slice(0, 1) !== "0") {
            setAboutU({ ...aboutU, stage: Number(e) });
          } else {
            if (e !== "00") {
              setAboutU({ ...aboutU, stage: Number(e.slice(1, 2)) });
            } else {
              setAboutU({ ...aboutU, stage: 0 });
            }
          }
        }
      }, [aboutU, setAboutU]);

    return {onBlurFunc, onFocusFunc, setValueFunc}
};
