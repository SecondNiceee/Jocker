import { useCallback} from 'react';
import Text from '../../components/Text/Text';
import Cap from '../../components/UI/Cap/Cap';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import BaidgeCategories from './ui/BaidgeCategories';
import { useDispatch, useSelector } from 'react-redux';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import { setDescription, setStage } from '../../store/baidgeCreating';
import StageInput from './ui/StageInput';

const BaidgeCreaitingOne = () => {

    const professions = useSelector((state) => state.profession.professions);

    const dispatch = useDispatch();

    const {stage, categoryInformation, description} = useSelector( (state) => state.baidgeCreatingSlice );

    const setStageToStore = useCallback((stage) => {
      dispatch(setStage(stage))
    }, [dispatch]);
  
    const setDescriptionToStore = useCallback( (description) => {
      dispatch(setDescription(description));
    }, [dispatch] );

    if (!categoryInformation.category || !professions || !categoryInformation?.profession?.id){
      return (<div className='h-screen w-screen min-h-screen'>
        <MyLoader />
      </div>) 
    }
    return (
        <>
        <div className="pt-[16px] px-[16px] min-w-[100vw] bg-[#18222d] flex flex-col pb-[100px]">
            <Cap steps={2} className={"mt-[4px] flex items-center"} step={1} > 
                <Text className = {"font-sf-pro-display-600 text-[20px] font-semibold text-white"}> Бейдж исполнителя </Text>{" "}
            </Cap>
            <BaidgeCategories className={"mt-[18px]"} down='Профессия' categoryInformation={categoryInformation} />
            <StageInput setStage={setStageToStore} stage={stage} />
            <DescriptionAndPhoto  className={"mt-[18px]"} titleStyles={{
                color : "#DAF5FE"
            }} textTitle={"Краткое резюме"} textPlaceholder={"Краткое резюме"} setText={setDescriptionToStore} isFileInput = {false} text={description} />
            <p className='font-sf-pro-display-400 mt-[5px] text-[13px] leading-[16px] mx-auto text-[#daf5fe]'>
                Вкратце расскажите о себе и своем опыте работы.
            </p>
        </div>

        </>
    );
};

export default BaidgeCreaitingOne;