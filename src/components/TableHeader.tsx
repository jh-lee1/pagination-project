import styled from "@emotion/styled"
import { useRouter } from "next/router"
import {PiStarFill} from 'react-icons/pi'

 
export function TableHeader(){
    const router = useRouter();

    const handleClick = () => {
        router.push('?page=1')
    }
    return(
        <TableHeaderContainer>
            <TableTitleWrapper>
                <TableTitle onClick={handleClick}>전체글</TableTitle>
                <PiStarFill/>
            </TableTitleWrapper>
            <TableButton>글쓰기</TableButton>
        </TableHeaderContainer>
    )
}


const TableHeaderContainer = styled.div`
    display:flex;
    justify-content:space-between;    
    align-items:center;
    width:100%;
`
const TableTitleWrapper = styled.div`
    display:flex;
    width:92px;
    justify-content:space-between;
    font-size:24px;
    font-weight:bold;
    > svg{
        color: #e2e2e2;
    }
`
const TableTitle = styled.h1`
    cursor: pointer;
`
const TableButton = styled.button`
    color:white;
    background-color:#f26f72;
    border-radius:6px;
    padding: 8px 12px;
`