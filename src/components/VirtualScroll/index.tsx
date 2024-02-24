/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef } from "react";

// UI
import { Stack, Box } from '@chakra-ui/react';

type Props = {
    data: any[];
    uniqueKey: string;
    itemFixedHeight: number;
    unobserve?: boolean;
    itemRender: (data: any, index: number) => React.ReactNode;
    onScrollDown: () => void;
}


const VirtualScroll: FC<Props> = ({ data, uniqueKey, itemFixedHeight, unobserve, itemRender, onScrollDown }) => {
    const lastElementRef = useRef(null);

    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            onScrollDown();
        }
    }, { threshold: 1.0, rootMargin: `${itemFixedHeight * 2}px` });
    

    useEffect(() => {
        if (lastElementRef.current) {
            if (unobserve) {
                observer.unobserve(lastElementRef.current)
            } else {
                observer.observe(lastElementRef.current)
            }
        }
        return () => {
            lastElementRef.current && observer.unobserve(lastElementRef.current);
        }
    }, [data, unobserve])

    return (
        <>
            <Stack spacing="10px">
                {data.map((item, index) => <Box height={`${itemFixedHeight}px`} key={`${item[uniqueKey]}-${index}`}>{itemRender(item, index)}</Box>)}
                {data.length > 0 && <Box ref={lastElementRef} />}
            </Stack>
        </>
    )
}

export default VirtualScroll;
