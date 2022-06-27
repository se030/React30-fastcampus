import styled from "@emotion/styled";
import { useState } from "react";

const StyledNumBox = styled.select<{
    num: number;
}>`
    width: 48px;
    height: 48px;
    color: #48aeff;
    border: solid #48aeff 1px;
    font-size: 14px;
    appearance: none;
    text-align: center;
`;

const NumBox = (
    { num, setnum } : {
        num?: number;
        setnum?: (num:number) => void;
    }
) => {
    return <StyledNumBox num={num ?? 0} value={num}
        disabled = {!setnum}
        onChange = {(e) => {
            if (setnum) setnum(parseInt(e.currentTarget.value));
        }}
    >
        {
            !setnum && !num ? <option>+</option>
            : Array(45).fill(0).map((value, idx) => <option>
                {idx+1}
            </option>)
        }
    </StyledNumBox>
};

export default NumBox;