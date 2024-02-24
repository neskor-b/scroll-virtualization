import React from 'react';

// UI
import { useColorMode, IconButton, Tooltip, Box } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'


const ToggleColorMode: React.FC = () => {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <Box             
            position="fixed"
            top={5}
            right={2}
        >
            <Tooltip
                hasArrow 
                label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
                <IconButton 
                    aria-label='toggle light mode' 
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} 
                    onClick={toggleColorMode}
                />
            </Tooltip>
        </Box>
    );
};


export default ToggleColorMode;