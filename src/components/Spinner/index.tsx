import React, { FC } from 'react';
// components
import { Spinner as ChakraSpinner, SpinnerProps } from '@chakra-ui/react'
import { Center, Box, Container } from './styled';

type Props = {
    isLoading: boolean,
    children?: React.ReactNode,
    size?: SpinnerProps['size'],
}

const Spinner: FC<Props> = ({ isLoading, children, size }) => (
    <Container>
        {isLoading && (
            <Center>
                <ChakraSpinner size={size} color='blue.500' />
            </Center>
        )}
        {children && (
             <Box isLoading={isLoading}>
                 {children}
            </Box>
        )}

    </Container>
);

export default Spinner;
