import { filterKey } from './post/search';

export interface Pagination<T> {
  content: T;
  totalPageCount: number;
  currentPage: number;
  searchOption?: {
    page?: number;
    filter?: filterKey;
    value?: string;
    limit?: number;
  };
}
