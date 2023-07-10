import { SearchValue } from '../searchValue';

export interface PostRequestDto {
  page: number;
  limit: number;
  searchValue: SearchValue;
}
