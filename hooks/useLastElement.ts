import {useCallback, useRef} from "react";

export default function useLastElement(hasMore: boolean, setPageNumber, loading: boolean){
    const observer = useRef<any>();
    return useCallback((node) => {

        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore]);
}