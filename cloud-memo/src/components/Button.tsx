import styled from "@emotion/styled";
import { border, color, display, flexbox, layout, position, space, typography } from "styled-system";
import { BoxProps } from "./Box";

const Button = styled.button<BoxProps>`
    background-color: #000;
    color: #61dbfb;
    border: none;
    border-radius: 3px;
    font-size: 25px;
    padding: 5px 20px;
    margin: 5px 5px 5px 0px;
    ${layout}
    ${color}
    ${border}
    ${display}
    ${flexbox}
    ${typography}
    ${space}
    ${position}
`

export default Button;