import { Pagination as PaginationComponent } from '@/components/Pagination';
import { PostHeader } from '@/components/PostHeader';
import { PostItem } from '@/components/PostItem';
import { Search } from '@/components/Search/Search';
import { SearchFilter } from '@/components/Search/SearchFilter';
import { TableHeader } from '@/components/TableHeader';
import { SearchForm } from '@/molcules/search/SearchForm';
import type { Pagination } from '@/types/pagination';
import { PostResponseDto } from '@/types/post/dto/responseDto';
import { filterItem, filterKey } from '@/types/post/search';
import { processPosts } from '@/utils/posts';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Props {
  data: Pagination<PostResponseDto[]>;
}

export function Post({ data }: Props) {
  const router = useRouter();
  const [filter, setFilter] = useState<filterKey | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null); //null 일경우 초기에는 서버값을 우선
  const postColumns = processPosts(data.content, ['5%', '6%', '55%', '6%', '12%', '5%', '5%', '6%'], ['center', 'center', 'center', 'center', 'center', 'right', 'right', 'right']);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?page=1&filter=${filter}&value=${searchValue}`);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleChangeFilter = (value: filterKey) => {
    setFilter(value);
  };

  useEffect(() => {
    if (data) {
      setFilter(data.searchOption?.filter ?? 'title');
      setSearchValue(data.searchOption?.value ?? null);
    }
  }, [data]);

  const filterItems: filterItem[] = [
    { name: '제목', key: 'title' },
    { name: '닉네임', key: 'author' }
  ];
  const filterSelectedValue = filterItems.filter(filterItem => filterItem.key === (filter ?? data.searchOption?.filter))[0]?.key; //ssr select value

  return (
    <PostContainer>
      <TableHeader />
      <Table>
        <Thead>
          <PostHeader />
        </Thead>
        <Tbody>
          {postColumns.map(post => (
            <PostItem key={post.seq} cols={post.columns} />
          ))}
        </Tbody>
      </Table>
      <PaginationComponent currentPage={data.currentPage} pageNumbersLimit={data.searchOption?.limit} pageTotalCount={data.totalPageCount} />
      {/* <SearchFilter filterList={filterItems} initialValue={'author'} /> */}

      <SearchForm filterValue={filterSelectedValue} inputValue={searchValue ?? data.searchOption?.value} onChangeFilter={handleChangeFilter} onChangeValue={handleChangeValue} onSubmit={handleSubmit} filterList={filterItems} />

      {/* <Search filterValue={filterSelectedValue} inputValue={searchValue ?? data.searchOption?.value} onChangeFilter={handleChangeFilter} onChangeValue={handleChangeValue} onSubmit={handleSubmit} filterList={filterItems} /> */}
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
