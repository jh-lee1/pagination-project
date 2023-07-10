import { PostResponseDto } from '@/types/post/dto/responseDto';
import { ColumnItem } from '@/types/post/post';
import styled from '@emotion/styled';

interface Props {
  cols: ColumnItem[];
}

export function PostItem({ cols }: Props) {
  return (
    <ItemContainer>
      {cols.map((col, index) => (
        <Item key={index} style={{ width: col.width, textAlign: col.textAlign }}>
          {col.value}
        </Item>
      ))}
    </ItemContainer>
  );
}

const ItemContainer = styled.tr`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid #ededed;
  :hover {
    background-color: #f7f6f6;
  }
`;

const Item = styled.td`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
