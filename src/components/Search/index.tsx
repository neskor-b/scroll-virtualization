import React, { ChangeEvent } from 'react';
import { Input } from '@chakra-ui/react'

// hooks
import useDebouncedInput from 'hooks/useDebouncedInput';

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: Props) => {
    const input = useDebouncedInput({
        value,
        delay: 500,
        onChange
    })
    return (
        <Input {...input} />
    )
}

export default Search;
