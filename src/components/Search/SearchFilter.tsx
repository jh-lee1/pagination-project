import { filterItem, filterKey, filterName } from '@/types/post/search';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props {
  filterList: filterItem[];
  initialValue?: filterKey;
  value?: filterKey;
  onChangeFilter?: (value: filterKey) => void;
}

export function SearchFilter({ filterList, initialValue = 'title', value, onChangeFilter }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<filterKey | null>(null);
  const SelectBlockListRef = useRef<HTMLDivElement>(null);

  const handleOpen = (isSelect?: boolean, selectkey?: filterKey) => {
    setIsOpen(prev => !prev);
    if (selectkey) setSelect(selectkey);
    if (isSelect) {
      const filtered = filterList.filter(filterItem => filterItem.key === selectkey)[0];
      onChangeFilter && onChangeFilter(filtered.key);
    }
  };

  //CSR initial
  useEffect(() => {
    if (value) {
      setSelect(value);
    } else {
      setSelect(initialValue ?? value);
    }
  }, [value]);

  useEffect(() => {
    window.addEventListener('click', e => {
      setIsOpen(false);
    });
  }, []);

  return (
    <Container onClick={e => e.stopPropagation()}>
      <SelectBlock onClick={() => handleOpen()}>
        <SelectBlockTitle>{filterList.filter(filterItem => filterItem.key === (select ?? value ?? initialValue))[0]?.name} </SelectBlockTitle>
        <SelectBlockIconWrapper>
          <ArrowDownIcon />
        </SelectBlockIconWrapper>
      </SelectBlock>
      {isOpen && (
        <SelectListWrapper>
          {filterList.map((filterItem, index) => (
            <Item key={index} onClick={() => handleOpen(true, filterItem.key)} className={`${filterItem.key === select && 'active'}`}>
              {filterItem.name}
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
