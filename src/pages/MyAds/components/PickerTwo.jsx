import { forwardRef, memo} from 'react';
import AdCreateFunc from '../../../components/UI/AdCreateFunc/AdCreateFunc';
import AdsContainer from './AdsContainer';


const PickerTwo = forwardRef(({ valueTwo , myAdsArray } , ref) => {
    return (
        <div className="picker__block" ref={ref}>
        <AdCreateFunc text={"Создать объявление"} link={"/AdCreating"} />
        <AdsContainer  valueTwo = {valueTwo}  myAdsArray={myAdsArray} />
      </div>
    );
} );

export default memo(PickerTwo);