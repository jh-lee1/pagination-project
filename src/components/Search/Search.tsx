import styled from '@emotion/styled';
import { SearchFilter } from './SearchFilter';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { filterItem, filterKey } from '@/types/post/search';

interface Props {
  initialInputValue?: string;
  inputValue?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ initialInputValue = '', inputValue, onChangeValue, onSubmit }: Props) {
  const router = useRouter();
  const [value, setValue] = useState<string>(initialInputValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeValue && onChangeValue(e);
  };

  //CSR
  // useEffect(() => {
  //   setValue(initialInputValue);
  // }, [filterValue, inputValue]);

  return (
    <Container onSubmit={handleSubmit}>
      <SearchInput onChange={handleChangeValue} value={inputValue ?? value} />
      <SearchButton type={'submit'}>검색</SearchButton>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
`;

const SearchInput = styled.input`
  width: 260px;
  border: 1px solid #ededed;
  font-size: 14px;
  margin-left: 8px;
  padding: 11px 12px 11px 10px;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  background-color: #f26f72;
  border-radius: 4px;
  color: white;
  padding: 12px;
  margin-left: 8px;
`;
