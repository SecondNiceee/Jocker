import React, { forwardRef } from 'react';
import cl from './TextArea.module.css'
const TextArea = forwardRef(({className , value , setValue , ...props} , ref ) => {
    const onFocus = (e) => {
        e.preventDefault()
        e.target.preventDefault()
    }
    return (
        <textarea onFocus={onFocus} ref={ref}  spellCheck="false"  autoComplete="off" value={value} onChange = {(e) => {setValue(e.target.value)}} className = {className ? [cl.TextArea , className].join(' ') : cl.TextArea} {...props}></textarea>
    );
});

export default TextArea;