import { Search } from '@/components/Search/Search';
import { SearchFilter } from '@/components/Search/SearchFilter';
import { filterItem, filterKey } from '@/types/post/search';
import styled from '@emotion/styled';
import { ChangeEvent, FormEvent } from 'react';

interface Props {
  initialFilterValue?: filterKey;
  initialInputValue?: string;
  filterValue?: filterKey;
  inputValue?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeFilter?: (value: filterKey) => void;
  filterList: filterItem[];
}

export function SearchForm({ initialFilterValue, initialInputValue, inputValue, filterValue, onChangeFilter, onChangeValue, onSubmit, filterList }: Props) {
  return (
    <SearchContainer>
      <SearchFilter filterList={filterList} initialValue={initialFilterValue} value={filterValue} onChangeFilter={onChangeFilter} />
      <Search inputValue={inputValue} onChangeValue={onChangeValue} onSubmit={onSubmit} />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
`;
