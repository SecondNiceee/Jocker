import { memo } from 'react';
import Text from '../../Text/Text';
import { useSelector } from 'react-redux';
const textPrice = 'USD'
const FirstMainBottomLeft = ({tonValue, rublePrice}) => {
  const dollarValue = useSelector((state) => state.ton.dollarValue) 
    return (
        <div className="FirstMain__bottom-left">
        <div className="FirstMain__price-up">
          <p>{rublePrice} руб</p>
          <img src={"/images/icons/rublePayIcon.svg"} alt="" />
        </div>
        <div className='FirstMain__price-bottom'>
          <p>
            ~ {Number((rublePrice / dollarValue).toFixed(2)).toLocaleString(
              "ru-RU"
            ).replace(',', '.')}
          </p>
            <Text>
            {textPrice}
          </Text>
        </div>
      </div>
    );
};

export default memo(FirstMainBottomLeft);