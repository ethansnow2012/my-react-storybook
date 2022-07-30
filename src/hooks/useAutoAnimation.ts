
import {useRef, useEffect} from "react"

import autoAnimate from '@formkit/auto-animate'

export default function useAutoAnimate(options = {}) {
    const element = useRef(null);
    useEffect(() => {
        if (element.current instanceof HTMLElement)
            autoAnimate(element.current, options);
    }, [element]);
    return [element];
}