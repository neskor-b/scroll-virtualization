/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// api
import { apiGetNews } from 'api/apiRequests';

// hooks
import useUpdateEffect from './useUpdateEffect';

// types
import Article from 'api/entity/article';

type Params = {
    q: string,
    page: number,
    pageSize: number,
}

const useArticles = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNextPage] = useState(true);
    const [params, setParams] = useState<Params>({ page: 1, pageSize: 10, q: '' });

    // const fetchArticles = async (withrReset: boolean = true) => {
    //     setIsLoading(true);
    //     try {
    //         withrReset && setArticles([]);
    //         const { data } = await apiGetNews(params);
    //         if (withrReset) {
    //             setArticles(data.articles);
    //         } else {
    //             setArticles(prevArticles => [...prevArticles, ...data.articles]);
    //         }
    //         data.articles.length === 0 ? setHasNextPage(false) : setHasNextPage(true);
    //     } catch (error) {
    //         setIsError(true);
    //         setHasNextPage(false);
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // TODO MOCK - delete
    const fetchArticles = (test: boolean = true) => {
        const newRandomArticles = Array.from({ length: 10 }, () => ({
            source: {
                id: '1',
                name: '1',
            },
            author: '1',
            title: '1',
            description: '1',
            url: '1',
            urlToImage: '1',
            publishedAt: '1',
            content: '1'
        }))
        
        setArticles(prevArticles => [...prevArticles, ...newRandomArticles]);
    }

    const changeParam = (paramName: keyof Params) => (value: string | number) => {
        setParams({ ...params, [paramName]: value });
    }

    useEffect(() => {
        fetchArticles();
    }, [])

    useUpdateEffect(() => {
        fetchArticles();
    }, [params.q])

    useUpdateEffect(() => {
        fetchArticles(false);        
    }, [params.page])

    return { articles, isError, isLoading, params, hasNext, fetchArticles, changeParam };
}

export default useArticles;
