import { memo } from 'react';
import cl from './Pallete.module.css'
const Pallete = ({className , category}) => {
    return (
        <div className = {className ? [cl.Pallete , className].join(' ') : cl.Pallete}>
            <img src = {`/images/icons/category-icon-${category}.svg`} alt="" />
        </div>
    );
};

export default memo(Pallete);