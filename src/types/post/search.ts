export type filterName = '제목' | '닉네임';
export type filterKey = 'title' | 'author' | string;
export const filterKeys = ['title', 'author'] as const; // for type guard (assertion tuple)
export type filterItem = { name: filterName; key: filterKey };
