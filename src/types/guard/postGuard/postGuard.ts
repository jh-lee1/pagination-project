import { filterKey, filterKeys } from '@/types/post/search';

export function isFilterKey(filterKey: any): filterKey is string {
  return filterKeys.includes(filterKey);
}

export function isSearchValue(value: any): value is string {
  return typeof value === 'string';
}
