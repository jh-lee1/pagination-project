import { PostResponseDto } from "@/types/post/responseDto"
import styled from "@emotion/styled"
import dayjs from "dayjs"





interface Props extends PostResponseDto {

}

export function PostItem(props:Props){

    const cols = [
        { name: '번호', value: props.seq, width: '5%'},
        { name: '게시판명', value: props.postCategoryName, width: '6%'},
        { name: '제목', value: props.title, width: '55%'},
        { name: '글쓴이', value: props.author, width: '6%'},
        { name: '등록일', value: dayjs(props.createdDate).format('YYYY.MM.DD'), width: '12%'},
        { name: '조회', value: props.views, width: '5%'},
        { name: '추천', value: props.likes, width: '5%'},
        { name: '스크랩', value: props.scrap, width: '6%'},
    ]

    return(
        <ItemContainer>
            {cols.map((r, idx) => (<Item key={idx} style={{width:r.width}} >{r.value}</Item>))}
        </ItemContainer>
    )
}

const ItemContainer = styled.tr`
    display:flex;
    width:100%;
    padding:12px 0;
    border-bottom:1px solid #ededed;
    :hover{
        background-color: #f7f6f6
    }
`

const Item = styled.td`
    text-align:center;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
`
