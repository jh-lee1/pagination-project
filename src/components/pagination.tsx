import { Pagination } from '@/types/pagination';
import { PostResponseDto } from '@/types/post/responseDto';
import { processPaginationNumbers } from '@/utils/paginationNumbers';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface Props {
  data?: Pagination<PostResponseDto[]>;
  //   onChangePage?: (currentPage: number) => void;
}

export function Pagination({ data }: Props) {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const currentPage = Number(data?.currentPage);
  const pageNumLimit = Number(data?.searchOption?.limit); // 하단에 보이는 페이지 리미트
  const pageTotalCount = Number(data?.totalPageCount); //모든 전체 페이지
  //   const [totalPageCount, setTotalPageCount] = useState(1);
  //   const [pageNumberLimit, setPageNumberLimit] = useState(10);
  //   const [pageNumberList, setPageNumberList] = useState<number[]>();

  const newArr = processPaginationNumbers({ currentPage, pageNumLimit, pageTotalCount });

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
    if (page + 1 > pageTotalCount) return;
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: page + 1
      }
    });
  };
  const handleDecreese = () => {
    if (page - 1 < 1) return;
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page: page - 1
      }
    });
  };

  // 데이터를 받았을 때 근데 이제 쓸일 없을듯.
  //   useEffect(() => {
  //     if (data) {
  //       setTotalPageCount(data.totalPageCount || 1);
  //     }
  //   }, [data]);

  //   useEffect(() => {
  //     const pageNumLimit = Number(data?.searchOption?.limit);
  //     const pageTotalCount = Number(data?.totalPageCount) / pageNumLimit;
  //     // let startNumber = page - Math.floor(pageNumberLimit / 2) + 1; // 시작점 조정
  //     let startNumber = page - Math.floor(pageNumLimit / 2) + 1; // 시작점 조정
  //     if (startNumber < 1) {
  //       startNumber = 1; //시작점 재조정(계산된 페이지가 1보다 작을경우)
  //     }

  //     let endNumber = startNumber + pageNumLimit - 1; //종료점 조정
  //     if (endNumber > totalPageCount) {
  //       endNumber = totalPageCount + 1; //종료점 재조정 (계산된 페이지가 토탈페이지보다 클 경우)
  //       startNumber = endNumber - pageNumLimit + 1; //시작점 재조정 (조정된 종로점 기준 재조정)
  //       if (startNumber < 1) {
  //         startNumber = 1; //시작점 재조정.(조정된 시작점이 음수일 경우)
  //       }
  //     }

  //     let loop = startNumber;
  //     const newArr = new Array(endNumber - startNumber).fill(1).map(() => loop++);
  //     setPageNumberList(newArr);
  //   }, [totalPageCount, pageNumberLimit, page]);

  //   useEffect(() => {
  //     onChangePage && onChangePage(page);
  //   }, [page]);

  return (
    <Container>
      <ArrowWrapper onClick={handleDecreese}>
        <LeftArrowIcon />
      </ArrowWrapper>
      {/* {pageNumberList &&
        pageNumberList.map(r => (
          <Item key={r} onClick={() => handleChangePage(r)} className={`${r === page && 'active'}`}>
            {r}
          </Item>
        ))} */}
      {newArr &&
        newArr.map(r => (
          <Item key={r} onClick={() => handleChangePage(r)} className={`${r === page && 'active'}`}>
            {r}
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
