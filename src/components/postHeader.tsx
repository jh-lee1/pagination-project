import { TextAlign } from '@/types/post/post';
import styled from '@emotion/styled';

const headers: { name: string; width: string; textAlign: TextAlign }[] = [
  { name: '번호', width: '5%', textAlign: 'center' },
  { name: '게시판명', width: '6%', textAlign: 'center' },
  { name: '제목', width: '55%', textAlign: 'center' },
  { name: '글쓴이', width: '6%', textAlign: 'center' },
  { name: '등록일', width: '12%', textAlign: 'center' },
  { name: '조회', width: '5%', textAlign: 'right' },
  { name: '추천', width: '5%', textAlign: 'right' },
  { name: '스크랩', width: '6%', textAlign: 'right' }
];

export function PostHeader() {
  return (
    <HeaderContainer>
      {headers.map((header, index) => (
        <Item key={index} style={{ width: header.width, textAlign: header.textAlign }}>
          {header.name}
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
  /* height: 40px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 0;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`;
