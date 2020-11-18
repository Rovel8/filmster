import {useCallback, useRef, useState} from "react";


export default function useOnScreen(setVisible){
    const observer = useRef<any>()
    return useCallback((node) => {
        if(observer.current){
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver((entry) => {
            setVisible(entry[0].isIntersecting)
        })
        if(node) observer.current.observe(node)
    }, [])
}