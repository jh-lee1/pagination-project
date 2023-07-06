export interface Pagination<T> {
  content: T;
  totalPageCount: number;
  currentPage: number;
  searchOption?: {
    page: number;
    category: string;
    value: string;
    limit: number;
  };
}
