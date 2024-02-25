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
        setIsLoading(true);
        let newRandomArticles: Article[] = [];

        for (let i = 0 || articles.length; i < (articles.length + 10); i++) {
            newRandomArticles.push({
                source: {
                    id: 'test',
                    name: 'test'
                },
                author: '',
                title: `${i + 1} name`,
                description: '',
                url: '',
                urlToImage: '',
                publishedAt: '',
                content: `${i}`
            });
        }
        if (articles.length <= 20) {
            setArticles(prevArticles => [...prevArticles, ...newRandomArticles]);
        } else {
            setHasNextPage(false);
        }
        setIsLoading(false);
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
