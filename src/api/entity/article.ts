type Source =  {
    id: string;
    name: string;
}

type Article =  {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export default Article;
  