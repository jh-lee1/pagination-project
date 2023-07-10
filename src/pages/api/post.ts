import { dummyPost } from '@/common/dummy';
import { isNumber, isString } from '@/types/guard/commonGuard/guard';
import { isFilterKey } from '@/types/guard/postGuard/postGuard';
import { Pagination } from '@/types/pagination';
import { PostResponseDto } from '@/types/post/dto/responseDto';
import { Post } from '@/types/post/post';
import { filterKey } from '@/types/post/search';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  data?: any[];
};

export interface CustomError {
  message: string;
  statusCode: number;
}

// TODO: type casting 제거

export default function handler(req: NextApiRequest, res: NextApiResponse<Pagination<PostResponseDto[]> | CustomError>) {
  if (req.method === 'GET') {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let filter = req.query.filter ?? '';
    let value = req.query.value ?? '';

    if (!isNumber(page)) {
      return res.status(400).json({ message: '잘못된 요청입니다. page는 number여야 합니다.', statusCode: 400 });
    }
    if (!isNumber(limit)) {
      return res.status(400).json({ message: '잘못된 요청입니다. limit는 number여야합니다.', statusCode: 400 });
    }
    if (!isString(filter)) {
      return res.status(400).json({ message: '잘못된 요청입니다. filter는 string이여야 합니다', statusCode: 400 });
    }
    if (!isString(value)) {
      return res.status(400).json({ message: '잘못된 요청입니다. 검색값은 string이여야 합니다', statusCode: 400 });
    }
    console.log(filter, value);
    const startIndex = page * limit - limit;
    const endIndex = page * limit;
    let dummyData: Post[] = [];
    let result;
    if (filter && value) dummyData = dummyPost.filter(post => post[filter as keyof Post] === value);
    if (!filter || !value) dummyData = dummyPost;
    result = dummyData.slice(startIndex, endIndex);

    return res.status(200).json({
      content: result,
      totalPageCount: Math.ceil(dummyData.length / limit),
      currentPage: page,
      searchOption: {
        page: page,
        limit: limit,
        filter: filter,
        value: value
      }
    });
  }
  return res.status(500).json({ message: '예외', statusCode: 500 });
}

class HttpError {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
