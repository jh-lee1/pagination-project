import styled from '@emotion/styled';
import { SearchCategory, categoryItems } from './SearchCategory';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@/types/pagination';
import { PostResponseDto } from '@/types/post/responseDto';

interface Props {
  data?: Pagination<PostResponseDto[]>;
  onSubmitSearch?: ({ category, value }: { category: string; value: string }) => void;
}

export function Search({ data, onSubmitSearch }: Props) {
  const initialValue = categoryItems.filter(f => f.key === data?.searchOption?.category)[0].name; //ssr select value
  const router = useRouter();
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('title');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmitSearch && onSubmitSearch({ category, value });
    router.push(`?page=1&category=${category}&value=${value}`);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };

  //CSR
  useEffect(() => {
    if (data) {
      const serverCategoryValue = String(data.searchOption?.category);
      const serverInputValue = String(data.searchOption?.value);
      setCategory(serverCategoryValue);
      setValue(serverInputValue);
    }
  }, [data]);

  //   useEffect(() => {
  //     const pathValue = String(queryValue || ''); //없는변수면 안에서 처리
  //     const pathCategory = String(queryCategory || '');
  //     if (pathValue) setValue(pathValue);
  //     if (pathCategory) setCategory(pathCategory);
  //     if (pathCategory && pathValue) {
  //       onSubmitSearch && onSubmitSearch({ category: pathCategory, value: pathValue });
  //     }
  //   }, [router]);

  return (
    <Container onSubmit={handleSubmit}>
      <SearchCategory initialValue={initialValue} onChangeCategory={handleChangeCategory} />
      <SearchInput onChange={handleChangeValue} value={value || data?.searchOption?.value} />
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
