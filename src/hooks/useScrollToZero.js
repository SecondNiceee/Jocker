import { useEffect } from 'react';

const useScrollToZero = () => {
    useEffect(() => {
        return () => {
        window.scrollTo(0, 0);
        };
    }, []);
};

export default useScrollToZero;