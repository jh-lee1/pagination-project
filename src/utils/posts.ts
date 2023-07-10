import { PostResponseDto } from '@/types/post/dto/responseDto';
import { ColumnItem, TextAlign } from '@/types/post/post';
import dayjs from 'dayjs';
import { isDate } from 'util/types';

export function processPosts(postItems: PostResponseDto[], widths: string[], textAlign: TextAlign[]) {
  let columnsPosts: { seq: number; columns: ColumnItem[] }[] = [];
  postItems.forEach(postItem => {
    let columnsItems: ColumnItem[] = [];
    let forLoopCount = 0;
    for (const [key, value] of Object.entries(postItem)) {
      let postItemValue = value;
      if (key === 'createdDate') {
        postItemValue = dayjs(value).format('YYYY-MM-DD');
      }
      columnsItems.push({ name: key, value: postItemValue, width: widths[forLoopCount], textAlign: textAlign[forLoopCount] });
      forLoopCount++;
    }
    columnsPosts.push({ seq: postItem.seq, columns: columnsItems });
    columnsItems = [];
  });
  return columnsPosts;
}
