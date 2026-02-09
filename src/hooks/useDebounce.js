import { useState, useEffect } from "react";

export const useDebounce = (value , delay = 1000) => {
    const [debounceValue, setDebounceValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(()=>{
        setIsDebouncing(true);
        const timeOut = setTimeout(()=>{
            setDebounceValue(value);
            setIsDebouncing(false);
        }, delay);
        return () => {
            clearTimeout(timeOut);
        };
    }, [value, delay])
    return [debounceValue, isDebouncing];
}