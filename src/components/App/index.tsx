import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'

// UI
import { Center } from '@chakra-ui/react';

// styled
import { Box } from 'components/App/styled';

// components
import Search from 'components/Search';
import NewsItem from 'components/NewsItem';
import ToggleColorMode from 'components/ToggleColorMode';
import Spinner from 'components/Spinner';
import VirtualScroll from 'components/VirtualScroll';

// hooks
import useArticles from 'hooks/useArticle';


function App() {
  const { articles, isLoading, params, hasNext, changeParam } = useArticles();
  const changSearch = changeParam('q');
  const changePage = changeParam('page');

  const changePageHandler = () => {
    if (hasNext) {
      changePage(params.page + 1);
    }
  };

  return (
    <ChakraProvider>
      <Center>
        <Box>
            <ToggleColorMode/>
            <Search value={params.q} onChange={e => changSearch(e.target.value)} />
            <VirtualScroll 
                data={articles}
                uniqKey='title'
                config={{
                      itemFixedHeight: 170,
                      visibleCount: params.pageSize,
                      bufferCount: 10,
                      listGap: 10
                }}
                itemRender={article => <NewsItem article={article} />}
                onScrollDown={changePageHandler}
            />
            <Spinner size='xl' isLoading={isLoading} />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
