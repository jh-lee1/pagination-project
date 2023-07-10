import { processPaginationNumbers } from '@/utils/paginationNumbers';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  currentPage?: number;
  pageNumbersLimit?: number;
  pageTotalCount?: number;
}

export function Pagination({ currentPage = 1, pageNumbersLimit = 2, pageTotalCount = 1 }: Props) {
  const router = useRouter();
  // const page = Number(router.query.page) || 1;
  // const currentPage = data?.currentPage ?? 1;
  // const pageNumLimit = data?.searchOption?.limit ?? 2; // 하단에 보이는 페이지 리미트 (2 숫자부터 페이지가 드러납니다.)
  // const pageTotalCount = data?.totalPageCount ?? 1; //모든 전체 페이지

  const pageItems = processPaginationNumbers({ currentPage, pageNumbersLimit, pageTotalCount });

  const handleChangePage = (pageNumber: number) => {
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: pageNumber
      }
    });
  };

  const handleIncreese = () => {
    if (currentPage + 1 > pageTotalCount) return;
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: currentPage + 1
      }
    });
  };
  const handleDecreese = () => {
    if (currentPage - 1 < 1) return;
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: currentPage - 1
      }
    });
  };

  return (
    <Container>
      <ArrowWrapper onClick={handleDecreese}>
        <LeftArrowIcon />
      </ArrowWrapper>
      {pageItems &&
        pageItems.map(pageItem => (
          <Item key={pageItem} onClick={() => handleChangePage(pageItem)} className={`${pageItem === currentPage && 'active'}`}>
            {pageItem}
          </Item>
        ))}
      <ArrowWrapper onClick={handleIncreese}>
        <RightArrowIcon />
      </ArrowWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Item = styled.div`
  padding: 12px;
  cursor: pointer;
  color: #bbbbbb;
  &.active {
    color: #f26f72;
  }
`;

const ArrowWrapper = styled.div`
  padding: 12px;
  cursor: pointer;
`;

const LeftArrowIcon = styled(MdKeyboardArrowLeft)``;
const RightArrowIcon = styled(MdKeyboardArrowRight)``;
