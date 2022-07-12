import styled from "@emotion/styled";
import { display } from "styled-system";
import Box, { BoxProps } from "./Box";

const Flex = styled(Box)<BoxProps>`
    display: flex;
    ${display}  // Box단의 display-css들이 덮여쓰이지 않도록!
`

export default Flex;