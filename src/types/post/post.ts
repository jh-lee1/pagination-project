export interface Post {
  seq: Seq;
  categoryName: CategoryName;
  title: Title;
  author: Author;
  createdDate: CreateDate;
  views: Views;
  likes: Likes;
  scrap: Scrap;
}

export type Seq = number;
export type CategoryName = string;
export type Title = string;
export type Author = string;
export type CreateDate = string;
export type Views = number;
export type Likes = number;
export type Scrap = number;

export type TextAlign = 'center' | 'right' | 'left';

export type ColumnItem = { name: string; value: string; width: string; textAlign: TextAlign };
