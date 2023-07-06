// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dummyPost } from '@/common/dummy';
import { Pagination } from '@/types/pagination';
import { PostResponseDto } from '@/types/post/responseDto';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  data?: any[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Pagination<PostResponseDto[]> | { error: string }>) {
  if (req.method === 'GET') {
    const { page, limit, category, value } = req.query;
    const startIndex = Number(page) * Number(limit) - Number(limit);
    const endIndex = Number(page) * Number(limit);
    let dummyData: any[] = [];
    let result;
    if (category) dummyData = dummyPost.filter(f => f[category as keyof PostResponseDto] === String(value));
    if (!category || !value) dummyData = dummyPost;
    result = dummyData.slice(startIndex, endIndex);

    return res.status(200).json({
      content: result,
      totalPageCount: Math.ceil(dummyData.length / Number(limit)),
      currentPage: Number(page),
      searchOption: {
        page: Number(page),
        limit: Number(limit),
        category: String(category),
        value: String(value)
      }
    });
  }
  return res.status(500).json({ error: '예외' });
}
