import makeApiCall from "api/makeApiCall";

// types
import Article from "api/entity/article";



type Params = {
    q?: string,
    page?: number,
    pageSize?: number,
}

type Response = {
    status: string;
    totalResults: number;
    articles: Article[];
}

export const apiGetNews = (query?: Params) => makeApiCall.get<Response>('/everything', { params: query });
