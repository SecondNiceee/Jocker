import React, { memo, useEffect } from 'react';
import cl from './Holding.module.css'
import Text from '../../../components/Text/Text';
import { useSelector } from 'react-redux';
import en from '../../../constants/language';
import formateMoney from '../../../functions/formateMoney';
import MainButton from '../../../constants/MainButton';
import translation from '../../../functions/translate';
const Holding = ({className, taskInformation }) => {
    const value = useSelector(state => state.ton.value)
    useEffect( () => {
        MainButton.setText(translation("ЗАХОЛДИРОВАТЬ"))
    } , [] )
    return (
        <div className={className ? [className , cl.Holding].join(' ') : cl.Holding}>
            <Text>К ХОЛДИРОВАНИЮ</Text>
            <p>{taskInformation.tonValue} <span className={cl.TON}>TON</span></p>
            <p>~  {formateMoney(String(taskInformation.tonValue * value).replace('.', ',') , 2, ',' )} {en ? "USD" : "RUB"}</p>
        </div>
    );
};

export default memo(Holding);