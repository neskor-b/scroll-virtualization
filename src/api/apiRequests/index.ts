import makeApiCall from "api/makeApiCall";



type Params = {
    q?: string,
    page?: number,
    pageSize?: number,
}

export const apiGetNews = (query?: Params) => makeApiCall.get('/everything', { params: query });
