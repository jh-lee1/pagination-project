import { PostResponseDto } from './dto/responseDto';

export interface SearchValue {
  category: string;
  value: string;
}

interface SelectSearchType extends Omit<PostResponseDto, 'seq' | 'postCategoryName' | 'createdDate' | 'views' | 'likes' | 'scrap'> {}

export type SelectSearchKeys = keyof SelectSearchType;
