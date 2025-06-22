import React, { memo } from 'react';
import cl from './Compact.module.css'
import Text from '../../Text/Text';
const Compact = ({ title, children, className , ...props}) => {
    return (
        <div {...props} className={className ? [cl.compactWrapper , className].join(' ') : cl.compactWrapper}>
            <Text className={cl.compactTitle}>{title}</Text>
                {children}
        </div>
    );
};

export default memo(Compact);