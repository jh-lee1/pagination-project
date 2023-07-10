// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dummyPost } from '@/common/dummy';
import { Pagination } from '@/types/pagination';
import { PostResponseDto } from '@/types/post/responseDto';
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
    let limit = Number(req.query.limit); // 이거는 진짜 모르겠다 애초에 통신떄문에 string으로 변환되서 오는데 이건 캐스팅이 필요한 것이 아닌가?
    let filter = req.query.filter ?? '';
    let value = req.query.value ?? '';

    try {
      if (typeof page !== 'number' || isNaN(page)) {
        throw new HttpError('잘못된 페이지 값이 들어왔습니다', 400);
      }
      if (typeof limit !== 'number' || isNaN(page)) {
        throw new HttpError('잘못된 리미트 값이 들어왔습니다.', 400);
      }
      if (typeof filter === 'object') {
        throw new HttpError('잘못된 카테고리 값이 들어왔습니다. error type => object', 400);
      }
      if (typeof value === 'object') {
        throw new HttpError('잘못된 검색값이 들어왔습니다. error type => object', 400);
      }
      const startIndex = page * limit - limit;
      const endIndex = page * limit;
      let dummyData: any[] = [];
      let result;
      if (filter) dummyData = dummyPost.filter(f => f[filter as keyof PostResponseDto] === value);
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
    } catch (e: any) {
      return res.status(e.statusCode).json({ message: e.message, statusCode: e.statusCode });
    }
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
