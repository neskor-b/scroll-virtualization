/* eslint-disable react/display-name */
import { chakra, ChakraProps } from "@chakra-ui/react";
import React, { ComponentType, ReactNode } from "react";

type TStylesWithProps<P> = (props: P) => ChakraProps


export const checkStyles = (props: ChakraProps) => props;

const withChakra = <P extends object>(
    Component: ComponentType<ChakraProps>,
    styles: TStylesWithProps<P> | ChakraProps
) => {
    const StyledComponent = chakra(Component, { baseStyle: {} });

    return (wrappedComponentProps: P & ChakraProps & { children?: ReactNode }) => {        
        const dynamicStyles = (typeof styles === "function" ? styles(wrappedComponentProps) : styles) ;
        return <StyledComponent {...dynamicStyles}> {wrappedComponentProps.children} </StyledComponent>;
    };
};

export const Chakra = chakra;

export default withChakra;
