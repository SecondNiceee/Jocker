import { memo, useCallback } from 'react';
import BaidgeCreatingLink from '../../../pages/BaidgeCreating/ui/BaidgeCreatingLink';
import { showAllert } from '../../../functions/showAlert';

const AddLinksComponent = ({links, setLinks}) => {


    const addLink = () => {
        if (links.length === 5){
            showAllert("Максимум 5 ссылок")
        }
        else{
            if (!(links[links.length-1] === "")){
                setLinks([...links, ""])
            }
        }
    } 

    const deleteLink = (index) => () => {
        setLinks([...links].filter((_, id) => {
            return id !== index;
        }))
    }

    const changeLinksHandler = useCallback( (id) => (text) => {
        if (!links){
            setLinks([text]);
        }
        else{
            setLinks([...links.map( (link, index) => {
                if (index === id) {
                    return text
                }
                return link;
            } )])
        }
    } , [setLinks, links] )

    const isAddActive = links?.length !== 5;

    return (
        <div className='flex flex-col gap-2 mt-[18px]'>
        <p className='mr-4 ml-[16px] font-sf-pro-display text-[13px] leading-4 text-[#DAF5FE]'>
            ССЫЛКИ
        </p>
        <div className='flex flex-col w-full gap-2'>
            {
                links?.length ? 
                <>
                    {links?.map( (link, index) => (
                        <BaidgeCreatingLink addLink={addLink} isAddActive = {isAddActive} deleteLink={deleteLink(index)} setLinks={setLinks} key={index} index={index} setText={changeLinksHandler(index)} text={link} />
                    ) )}
                </>
                :
                <BaidgeCreatingLink addLink={addLink} isAddActive = {isAddActive} deleteLink={deleteLink(0)} setLinks={setLinks} index={0} setText={changeLinksHandler(0)} text={''} />
            }

        </div>
    </div>
    );
};

export default memo(AddLinksComponent);