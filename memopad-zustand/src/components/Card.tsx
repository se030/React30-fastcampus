import styled from "@emotion/styled";
import { HiMinus } from 'react-icons/hi'
import useMemo from "../store/memoStore";

const CardContainer = styled.div`
    width: 240px;
    height: 240px;
    background-color: #ffffcc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    position: relative;
    cursor: pointer;
    :hover {
        transform: scale(1.05);
    }
`
const DeleteButton = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
    :hover {
        transform: scale(1.1);
    }
`

interface CardProps {
    idx: number;
    title: string;
    onClick: () => void;
}
const Card = ( { idx, title, onClick }: CardProps ) => {
    const { deleteMemo } = useMemo();
    return <CardContainer onClick={onClick}>
        <DeleteButton onClick={ e => {
            e.stopPropagation();
            deleteMemo(idx);
        }}><HiMinus /></DeleteButton>
        { title }
    </CardContainer>
}

export default Card;