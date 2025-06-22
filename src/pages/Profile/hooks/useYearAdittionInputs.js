import { useEffect } from 'react';
import translation from '../../../functions/translate';
import en from '../../../constants/language';


const lett = translation("лет");
const goda = translation("года");
const god = translation("год");

const useYearAdittionInputs = ({userInfo}) => {
    useEffect(() => { // Логика добавления к инпуту 
        let stage = String(userInfo.profile.stage);
        let numb = String(stage).slice(stage.length - 1, stage.length);
    
        const numberInput = document.getElementById("numberInput");
    
        if (numberInput) {
          if (en) {
            if (Number(stage) === 1) {
              if (!numberInput.value.includes("year")) {
                numberInput.value += ` year`;
              }
            } else {
              if (!numberInput.value.includes("years")) {
                numberInput.value += ` years`;
              }
            }
          } else {
            if (Number(stage) > 10 && Number(stage) < 20) {
              if (!numberInput.value.includes(lett)) {
                numberInput.value += ` ${lett}`;
              }
            } else {
              if (numb > 1 && numb < 5) {
                if (!numberInput.value.includes(`${goda}`)) {
                  numberInput.value += ` ${goda}`;
                }
              } else {
                if (numb === 1) {
                  if (!numberInput.value.includes(`${god}`)) {
                    numberInput.value += ` ${god}`;
                  }
                } else {
                  if (!numberInput.value.includes(`${lett}`)) {
                    numberInput.value += ` ${lett}`;
                  }
                }
              }
            }
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userInfo]);
};

export default useYearAdittionInputs;