import { memo, useMemo } from 'react';
import cl from './Pallete.module.css'
const Pallete = ({className , category}) => {
    const imageSrc = useMemo( () => {
        switch (category){
            case 1 : 
                return "/images/icons/More.svg"
            case 2:
                return "/images/icons/TrulyDesign.svg"
            default :
                return "/images/icons/IT.svg"

        }
    } , [category]  );
    return (
        <div style={category === 2 ? {transform : "translateY(1px)"} : {}} className = {className ? [cl.Pallete , className].join(' ') : cl.Pallete}>
            <img src = {imageSrc} alt="" />
        </div>
    );
};

export default memo(Pallete);