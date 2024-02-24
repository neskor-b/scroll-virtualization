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

const TOP_SENTINEL_ID = 'top-sentinel';
const BOTTOM_SENTINEL_ID = 'bottom-sentinel';

const VirtualScroll: FC<Props> = ({ data, uniqueKey, itemFixedHeight, unobserve, itemRender, onScrollDown }) => {
    const bottomSentinelRef = useRef(null);
    const topSentinelRef = useRef(null);

    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            if (entry.target.id === BOTTOM_SENTINEL_ID) {
                onScrollDown();
            }
            if (entry.target.id === TOP_SENTINEL_ID) {
                console.log('top');
            }
        }
    }, { threshold: 1.0, rootMargin: `${itemFixedHeight * 3}px` });
    
    

    useEffect(() => {
        if (topSentinelRef.current) {
            if (unobserve) {
                observer.unobserve(topSentinelRef.current)
            } else {
                observer.observe(topSentinelRef.current)
            }
        }
        if (bottomSentinelRef.current) {
            if (unobserve) {
                observer.unobserve(bottomSentinelRef.current)
            } else {
                observer.observe(bottomSentinelRef.current)
            }
        }

        return () => {
            bottomSentinelRef.current && observer.unobserve(bottomSentinelRef.current);
            topSentinelRef.current && observer.unobserve(topSentinelRef.current);
        }
    }, [data, unobserve])

    return (
        <>
            <Stack spacing="10px">
                {data.length > 0 && <Box id={TOP_SENTINEL_ID} ref={topSentinelRef} />}
                {data.map((item, index) => <Box height={`${itemFixedHeight}px`} key={`${item[uniqueKey]}-${index}`}>{itemRender(item, index)}</Box>)}
                {data.length > 0 && <Box id={BOTTOM_SENTINEL_ID} ref={bottomSentinelRef} />}
            </Stack>
        </>
    )
}

export default VirtualScroll;
