import styled from '@emotion/styled';

const headers = [
  { name: '번호', width: '5%' },
  { name: '게시판명', width: '6%' },
  { name: '제목', width: '55%' },
  { name: '글쓴이', width: '6%' },
  { name: '등록일', width: '12%' },
  { name: '조회', width: '5%' },
  { name: '추천', width: '5%' },
  { name: '스크랩', width: '6%' }
];

export function PostHeader() {
  return (
    <HeaderContainer>
      {headers.map((r, idx) => (
        <Item key={idx} style={{ width: r.width }}>
          {r.name}
        </Item>
      ))}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.tr`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
`;

const Item = styled.th`
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
