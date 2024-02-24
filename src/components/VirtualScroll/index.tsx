/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef } from "react";

// UI
import { Stack, Box } from '@chakra-ui/react';

type Props = {
    data: any[];
    uniqueKey: string;
    itemFixedHeight: number;
    itemRender: (data: any, index: number) => React.ReactNode;
    onScrollDown: () => void;
}


const VirtualScroll: FC<Props> = ({ data, uniqueKey, itemFixedHeight, itemRender, onScrollDown }) => {
    const lastElementRef = useRef(null);

    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && data.length > 0) {
            onScrollDown();
        }
    }, { threshold: 1.0, rootMargin: `${itemFixedHeight * 2}px` });

    useEffect(() => {
        lastElementRef.current && observer.observe(lastElementRef.current);
        return () => {
            lastElementRef.current && observer.unobserve(lastElementRef.current);
        }
    }, [data])

    return (
        <>
            <Stack spacing="10px">
                {data.map((item, index) => <Box height={`${itemFixedHeight}px`} key={`${item[uniqueKey]}-${index}`}>{itemRender(item, index)}</Box>)}
                <Box ref={lastElementRef} />
            </Stack>
        </>
    )
}

export default VirtualScroll;
