import styled from "@emotion/styled";
import { HiMinus } from 'react-icons/hi'

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
    title: string;
    onClick: () => void;
    onDelete: () => void;
}
const Card = ( { title, onClick, onDelete }: CardProps ) => {
    return <CardContainer onClick={onClick}>
        <DeleteButton onClick={ e => {
            e.stopPropagation();
            onDelete();
        }}><HiMinus /></DeleteButton>
        { title }
    </CardContainer>
}

export default Card;