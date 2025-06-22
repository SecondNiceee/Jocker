import {useEffect } from 'react';
import Cap from '../../components/UI/Cap/Cap';
import Text from '../../components/Text/Text';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import useBlockInputs from '../../hooks/useBlockInputs';
import AddLinksComponent from '../../components/UI/AddLinksComponent/AddLinksComponent';

const BaidgeCreatingTwo = ({setLinks, links, taggsText, setTaggsText, setTaggs, taggs}) => {

    useBlockInputs();

    useEffect( () => {
        const splitedTaggs = taggsText.split(',').map((word, i) => word.trim()).filter((word) => word.length > 0)
        setTaggs(splitedTaggs)
    } , [taggsText, setTaggs] )

    const setTaggsFunction = (value) => {
        const LsplitedTaggs = taggsText.split(',').map((word, i) => word.trim()).filter((word) => word.length > 0)
        const legthsOfTaggs = LsplitedTaggs.map( (word) => word.length )
        const counterOfTaggs = LsplitedTaggs.length;
        
        const firstConfition = counterOfTaggs > 5 && value.length > taggsText.length;
        const secondCondition = Math.max(...legthsOfTaggs) > 20 && value.length > taggsText.length;
        if (firstConfition || secondCondition){

        }
        else{
            setTaggsText(value)
        }
    }

    return (
        <div className="pt-[16px] min-h-fit min-w-[100vw] px-[16px] bg-[#18222d] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">
            <Cap steps={2} className={"mt-[4px] flex items-center"} step={2} > 
                <Text className = {"font-sf-pro-display-600 text-[20px] font-semibold text-white"}> Бейдж исполнителя </Text>{" "}
            </Cap>

            <DescriptionAndPhoto   className={"mt-[18px]"} titleStyles={{
                color : "#DAF5FE"
            }} textTitle={"ТЭГИ"} textPlaceholder={"Презентации, motion, UX, 3D"} setText={setTaggsFunction} isFileInput = {false} text={taggsText} />
            
            <p className='font-sf-pro-display-400 mt-[5px] ml-[16px] text-[13px] leading-[16px] mx-auto text-[#daf5fe]'>
                Введите теги через запятую (например: логотип, брендинг, figma), но не больше 6-ти.
            </p>

            {
                taggs.length!==0 &&  <div className='flex mt-[18px] flex-wrap gap-[6px]'>
                {taggs.map((tag, index) => (
                    <div className='flex py-[7px] px-[12px] rounded-[8.35px] border-solid border-[1px] border-telegram'>
                        <p className='font-sf-pro-display leading-[17px] text-[15px] text-white'>{tag}</p>
                    </div>
                ))}
            </div>
            }

            <AddLinksComponent links={links} setLinks={setLinks} />

        </div>
    );
};

export default BaidgeCreatingTwo;