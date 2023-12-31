interface Props {
  currentPage: number;
  pageNumbersLimit: number;
  pageTotalCount: number;
}

/**
 *
 * 현재 페이지, 페이지 제한, 총 페이지 수를 객체로 받아 하단의 페이지네이션 숫자를 배열로 리턴합니다.
 *
 * @param {object} Props
 *
 * @returns 페이지 숫자 리스트를 반환한다.
 */
export function processPaginationNumbers({ currentPage, pageNumbersLimit, pageTotalCount }: Props) {
  let startNumber = currentPage - Math.floor(pageNumbersLimit / 2) + 1; // 시작점 조정
  if (startNumber < 1) {
    startNumber = 1; //시작점 재조정(계산된 페이지가 1보다 작을경우)
  }

  let endNumber = startNumber + pageNumbersLimit - 1; //종료점 조정
  if (endNumber > pageTotalCount) {
    endNumber = pageTotalCount + 1; //종료점 재조정 (계산된 페이지가 토탈페이지보다 클 경우)
    startNumber = endNumber - pageNumbersLimit + 1; //시작점 재조정 (조정된 종로점 기준 재조정)
    if (startNumber < 1) {
      startNumber = 1; //시작점 재조정.(조정된 시작점이 음수일 경우)
    }
  }

  let loop = startNumber;
  const newArr = new Array(endNumber - startNumber).fill(1).map(() => loop++);

  return newArr;
}
