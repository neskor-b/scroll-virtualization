import React, { FC } from 'react';

// UI
import { Card, CardBody, Image, Flex, Heading, Stack,  Link, Text } from '@chakra-ui/react';

// types
import Article from 'api/entity/article';

type Props = {
    article: Article
}

const NewsItem: FC<Props> = ({ article }) => {
    return (
        <Card height="170px" maxWidth="100%">
            <CardBody>
                <Stack spacing={3}>
                    <Heading noOfLines={1} as={Link} href={article.url} target='_blank' size='sm'>
                        {article.title}
                    </Heading>
                    <Flex gap={3}>
                        <Image w={"150px"} h={"100px"} alt={article.title} src={article.urlToImage} />
                        <Text noOfLines={4} maxH={"100px"} >{article.description}</Text>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default NewsItem;