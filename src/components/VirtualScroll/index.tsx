/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useState } from "react";

// UI
import { Stack, Box } from '@chakra-ui/react';

type Props = {
    data: any[];
    uniqKey: string;
    config: {
        itemFixedHeight: number,
        visibleCount: number,
        bufferCount: number,
        listGap: number
    }
    itemRender: (data: any, index: number) => React.ReactNode;
    onScrollDown: () => void;
}

const VirtualScroll: FC<Props> = ({ data, uniqKey, config, itemRender, onScrollDown }) => {
    const [virtualItems, setVirtualItems] = useState(0);

    const botomObserverConfig = { threshold: 0.1, rootMargin: `${(config.itemFixedHeight + config.listGap) * config.bufferCount}px 0px 0px 0px` }
    const topObserverConfig = { threshold: 0.1, rootMargin: `0px 0px ${(config.itemFixedHeight + config.listGap) * config.bufferCount}px 0px` }

    const botomObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            onScrollDown();
            setVirtualItems(prev => {
                if (config.visibleCount + prev < data.length) {
                    return prev + config.bufferCount
                } else {
                    return prev
                }
            });
        }
    }, botomObserverConfig);

    const topObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setVirtualItems(prev => (prev > config.bufferCount ? prev - config.bufferCount : 0))
        }
    }, topObserverConfig);
    
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

    useEffect(() => () => {
        botomObserver.disconnect();
        topObserver.disconnect();
    }, []);

    const skipWithBuffer = virtualItems > 0 ? virtualItems - config.bufferCount : 0
    const visibleData = data.slice(skipWithBuffer, virtualItems + config.visibleCount);
    
    return (
            <Stack spacing={`${config.listGap}px`}>
                {visibleData.map((item, index) => {
                    const key = `${item[uniqKey]}-${index}`;
                    const itemHeight = `${config.itemFixedHeight}px`;
                    if (index === 0) {
                        return (
                            <Box 
                                ref={topSentinelRef} 
                                mt={`${skipWithBuffer * (config.itemFixedHeight + config.listGap)}px`} 
                                height={itemHeight} 
                                key={key}
                            >
                                {itemRender(item, index)}
                            </Box>
                        )
                    }
                    if (index === visibleData.length - 1 ) {
                        return (
                            <Box 
                                ref={bottomSentinelRef} 
                                height={itemHeight} 
                                key={key}
                            >
                                {itemRender(item, index)}
                            </Box>
                        )
                    }
                    return ( 
                        <Box height={itemHeight} key={key}>
                            {itemRender(item, index)}
                        </Box>
                    )
                })}                
            </Stack>
    )
}

export default VirtualScroll;
