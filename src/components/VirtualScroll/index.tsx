/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useState } from "react";

// UI
import { Stack, Box } from '@chakra-ui/react';

type Props = {
    data: any[];
    uniqueKey: string;
    itemFixedHeight: number;
    visibleCount: number;
    itemRender: (data: any, index: number) => React.ReactNode;
    onScrollDown: () => void;
}

const TOP_SENTINEL_ID = 'top-sentinel';
const BOTTOM_SENTINEL_ID = 'bottom-sentinel';

const VirtualScroll: FC<Props> = ({ data, uniqueKey, itemFixedHeight, visibleCount, itemRender, onScrollDown }) => {
    const [topSkip, setTopSkip] = useState(0);

    const botomObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            onScrollDown();
            setTopSkip(prev => {
                if (visibleCount + prev < data.length) {
                    return prev + 3
                } else {
                    return prev
                }
            });
        }
    }, { threshold: 0.1, rootMargin: `${(itemFixedHeight + 10) * 3}px 0px` });

    const topObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setTopSkip(prev => (prev > 3 ? prev - 3 : 0))
        }
    }, { threshold: 0.1, rootMargin: `0px 0px ${(itemFixedHeight + 10) * 3}px 0px` });
    
    const bottomSentinelRef = useCallback((node: any) => {
        botomObserver.disconnect()
        if (node) {            
            botomObserver.observe(node);
        }
        return node;
    }, [data]);

    const topSentinelRef = useCallback((node: any) => {
        topObserver.disconnect()
        if (node) {
            topObserver.observe(node);
        }
        return node;
    }, [data]);

    useEffect(() => () => botomObserver.disconnect(), []);

    const visibleData = data.slice(topSkip > 0 ? topSkip - 3 : 0, topSkip + visibleCount);
    
    return (
            <Stack spacing="10px">
                {visibleData.map((item, index) => {
                    if (index === 0) {
                        return (
                            <Box 
                                opacity={0.5}
                                id={TOP_SENTINEL_ID} 
                                mt={`${(topSkip > 0 ? topSkip - 3 : 0) * (itemFixedHeight + 10)}px`} 
                                ref={topSentinelRef} 
                                height={`${itemFixedHeight}px`} 
                                key={`${item[uniqueKey]}-${index}`}
                            >
                                {itemRender(item, index)}
                            </Box>
                        )
                    }
                    if (index === visibleData.length - 1 ) {
                        return (
                            <Box 
                                opacity={0.5}
                                id={BOTTOM_SENTINEL_ID} 
                                ref={bottomSentinelRef} 
                                height={`${itemFixedHeight}px`} 
                                key={`${item[uniqueKey]}-${index}`}
                            >
                                {itemRender(item, index)}
                            </Box>
                        )
                    }
                    return ( 
                        <Box height={`${itemFixedHeight}px`} key={`${item[uniqueKey]}-${index}`}>
                            {itemRender(item, index)}
                        </Box>
                    )
                })}                
            </Stack>
    )
}

export default VirtualScroll;
