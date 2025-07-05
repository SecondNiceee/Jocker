import { useState } from 'react';
import Compact from '../../../components/UI/Compact/Compact';
import SmallInput from '../../../components/UI/SmallInput/SmallInput';
import { formateAgeString } from '../../../functions/formateAgeString';
import removeLeadingZeros from '../../../functions/removeLeadingZeros';

const StageInput = ({stage, setStage}) => {
    const [value, setValue] = useState(formateAgeString(String(stage)));

    const onBlur = (e) => {
        setValue(formateAgeString(String(stage)))
    }
    const onFocus = (e) => {
        setValue(stage);
    }
    const onChange = (value) => {
        if (!isNaN(value)){
            setValue(removeLeadingZeros(value));
            setStage(removeLeadingZeros(value));
        }
    }
    return (
        <Compact title={"Стаж работы"} className={"compact-block"}>
            <SmallInput
            mistakeText={"Стаж должен быть меньше 40 лет!"}
            mistake={stage > 40}
            id="numberInput"
            maxLength={2}
            onBlur={onBlur}
            onFocus={onFocus}
            inputMode="numeric"
            // type = "number"
            value={value}
            setValue={onChange}
            />
        </Compact>
    );
};

export default StageInput;