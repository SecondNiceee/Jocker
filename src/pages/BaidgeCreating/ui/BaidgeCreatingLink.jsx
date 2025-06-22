import React, { memo, useEffect, useRef, useState } from 'react';
import useGetSrcIcon from '../hooks/useGetSrcIcon';

const BaidgeCreatingLink = ({text, setText, index, addLink, deleteLink, isAddActive}) => {
    
    const [displayValue, setDisplayValue] = useState(text); // Отображаемое значение

    const iconSrc = useGetSrcIcon({text})


    useEffect( () => {
        setDisplayValue(text)
    } , [text] )

    const inputRef = useRef(null); // Ссылка на инпут для измерения ширины

    const calculateAvailableWidth = () => {
        const totalWidth = window.innerWidth; // Общая ширина окна
        const reservedSpace = 150; // Зарезервированное пространство
        return totalWidth - reservedSpace;
    };

    const handleFocus = () => {
        setDisplayValue(text); // Восстанавливаем полное значение при фокусе
    };

    const doesTextFit = (text) => {
        if (!inputRef.current) return false;

        const tempSpan = document.createElement('span');
        tempSpan.style.position = 'absolute';
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.style.font = window.getComputedStyle(inputRef.current).font; // Копируем стиль шрифта
        tempSpan.style.letterSpacing = window.getComputedStyle(inputRef.current).letterSpacing; // Копируем letter-spacing
        tempSpan.textContent = text; // Текст для измерения
        document.body.appendChild(tempSpan);

        const textWidth = tempSpan.offsetWidth; // Ширина текста
        document.body.removeChild(tempSpan);

        const availableWidth = calculateAvailableWidth();
        return textWidth <= availableWidth; // Помещается ли текст в доступную ширину
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setText(inputValue);
        setDisplayValue(inputValue);
    };


    const handleBlur = () => {
        let truncatedValue = text;

        // Обрезаем текст до тех пор, пока он не поместится в доступную ширину
        while (!doesTextFit(truncatedValue) && truncatedValue.length > 0) {
            truncatedValue = truncatedValue.slice(0, -1); // Убираем по одному символу
        }

        if (truncatedValue !== text) {
            truncatedValue += '...'; // Добавляем многоточие
        }

        setDisplayValue(truncatedValue);
    };

    return (
        <div className='py-[7px] px-[19px] items-center flex bg-card rounded-[12px]'>
            <img className='w-[30px] h-[30px]'  src={iconSrc} alt="" />
            <input onFocus={handleFocus} onBlur={handleBlur} value={displayValue} placeholder='Ссылка' ref={inputRef} onChange={handleInputChange} className='text-white w-full mr-[5px] ml-[13px] font-sf-pro-display-400 text-[16.67px] leading-[18px]' type="text" />
            {index !== 0 ? 
                    <img onClick={deleteLink} className='ml-auto w-[22px] h-[22px]' src="/images/BaidgeCreating/minus.svg" alt='#' />
                        :
                    <img onClick={addLink} className={`ml-auto w-[22px] h-[22px] ${isAddActive ? 'opacity-100' : 'opacity-50'}`} src="/images/BaidgeCreating/plus.svg" alt="#" />  
            }

        </div>
    );
};

export default memo(BaidgeCreatingLink);