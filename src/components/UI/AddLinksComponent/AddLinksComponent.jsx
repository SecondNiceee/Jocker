import React, { memo, useCallback, useEffect } from 'react';
import BaidgeCreatingLink from '../../../pages/BaidgeCreating/ui/BaidgeCreatingLink';
import { showAllert } from '../../../functions/showAlert';

const AddLinksComponent = ({links, setLinks}) => {
    const addLink = () => {
        if (links.length === 5){
            showAllert("Максимум 5 ссылок")
        }
        else{
            if (!(links[links.length-1] === "")){
                setLinks((value) => ([...value, ""]))
            }
        }
    } 

    const deleteLink = (index) => () => {
        setLinks((value) => ([...value].filter((link, id) => {
            return id !== index;
        })))
    }

    const changeLinksHandler = useCallback( (id) => (text) => {
        setLinks((value) => ([...value.map( (link, index) => {
            if (index === id) {
                return text
            }
            return link;
        } )]))
    } , [setLinks] )

    const isAddActive = links?.length !== 5;

    useEffect( () => {
        if (!links){
            setLinks([""])
        }
        else{
            if (!links.length){
                setLinks([""])
            }
        }
        
        // eslint-disable-next-line
    } , [] )

    return (
        <div className='flex flex-col gap-2 mt-[18px]'>
        <p className='mr-4 ml-[16px] font-sf-pro-display text-[13px] leading-4 text-[#DAF5FE]'>
            ССЫЛКИ
        </p>
        <div className='flex flex-col w-full gap-2'>
            {links?.map( (link, index) => (
                <BaidgeCreatingLink addLink={addLink} isAddActive = {isAddActive} deleteLink={deleteLink(index)} setLinks={setLinks} key={index} index={index} setText={changeLinksHandler(index)} text={link} />
            ) )}
        </div>
    </div>
    );
};

export default memo(AddLinksComponent);