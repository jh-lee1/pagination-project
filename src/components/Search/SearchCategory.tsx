import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export const categoryItems: { name: '제목' | '닉네임'; key: string; value: string[] }[] = [
  { name: '제목', key: 'title', value: ['title'] },
  // { name: '내용' , key: 'Contents', value:['contents']},
  // { name: '제목+내용' , key: 'TitleAndContents', value:['title','contents']},
  { name: '닉네임', key: 'author', value: ['author'] }
  // { name: '댓글' , key: 'Comment', value: ['comment']},
];

interface Props {
  initialValue?: '제목' | '닉네임';
  onChangeCategory?: (value: string) => void;
}

export function SearchCategory({ initialValue, onChangeCategory }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState(initialValue);

  const handleOpen = (isSelect?: boolean, selectname?: '제목' | '닉네임') => {
    setIsOpen(prev => !prev);
    if (selectname) setSelect(selectname);
    if (isSelect) {
      const filteredCategory = categoryItems.filter(f => f.name === selectname)[0];
      onChangeCategory && onChangeCategory(filteredCategory.key);
    }
  };

  useEffect(() => {
    if (!initialValue) setSelect('제목');
  }, [initialValue]);

  return (
    <Container>
      <SelectBlock onClick={() => handleOpen()}>
        <SelectBlockTitle>{select || initialValue} </SelectBlockTitle>
        <SelectBlockIconWrapper>
          <ArrowDownIcon />
        </SelectBlockIconWrapper>
      </SelectBlock>
      {isOpen && (
        <SelectListWrapper>
          {categoryItems.map((r, idx) => (
            <Item key={idx} onClick={() => handleOpen(true, r.name)} className={`${r.name === select && 'active'}`}>
              {r.name}
            </Item>
          ))}
        </SelectListWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  border-radius: 4px;
  border: 1px solid #e5e5e5;
  padding: 12px;
  min-width: 120px;
`;

const SelectBlock = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const SelectBlockTitle = styled.div``;
const SelectBlockIconWrapper = styled.div``;
const ArrowDownIcon = styled(MdKeyboardArrowDown)``;

const SelectListWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 48px;
  left: 0px;
  border-radius: 4px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 0px 1px,
    rgba(0, 0, 0, 0.1) 0px 4px 11px;
`;

const Item = styled.div`
  padding: 8px 12px;
  :hover {
    background-color: #f9999a;
  }
  &.active {
    background-color: #f26f72;
    color: white;
  }
`;
