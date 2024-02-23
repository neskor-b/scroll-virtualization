import axios from "axios";

const makeApiCall = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: {
        apiKey: process.env.REACT_APP_API_KEY,
        domains: 'bbc.co.uk'
    },
});


export default makeApiCall;