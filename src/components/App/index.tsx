import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'

// UI
import { Center } from '@chakra-ui/react';

// styled
import { Box } from 'components/App/styled';

// components
import Search from 'components/Search';

// api
import { apiGetNews } from 'api/apiRequests';

function App() {

  const fetchBooks = async () => {
    try {
      const data = await apiGetNews({
        page: 1,
        pageSize: 1
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  return (
    <ChakraProvider>
      <Center>
        <Box>
            <Search />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
