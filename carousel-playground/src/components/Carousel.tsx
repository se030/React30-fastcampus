import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { number } from "yargs";
 
const CarouselContainer = styled.div<{
    direction: 'row' | 'column';
}>`
    width: 500px;
    height: 200px;
    background-color: #eee;
    display: flex;
    flex-direction: ${({direction}) => direction};
    overflow: hidden;
    position: relative;
`
const CarouselItem = styled.div<{
    direction: 'row' | 'column';
    offset: number;
    transitionTime: number;
}>`
    width: 500px;
    height: 200px;
    min-width: 500px;
    min-height: 200px;
    transform: translate${({direction}) => direction === 'row'? 'X' : 'Y'}(${({offset}) => (-offset*100)}%);
    transition: transform ${({transitionTime}) => transitionTime}ms ease-out;
    padding: 25px;
`
const CarouselButton = styled.div<{
    direction: 'row' | 'column';
    position: 'left' | 'right';
}>`
    cursor: pointer;
    z-index: 999;

    width: fit-content;
    height: fit-content;
    color: #555;
    font-size: 24px;

    position: absolute;
    ${ ({position, direction}) => 
        position === 'left' && `top: ${direction === 'column'? 0 : "calc(50% - 9px)"}`
    };
    ${ ({position, direction}) => 
        position === 'left' && `left: ${direction === 'row'? "5px" : "calc(50% - 9px)"}`
    };
    ${ ({position, direction}) => 
        position === 'right' && `bottom: ${direction === 'column'? 0 : "calc(50% - 9px)"}`
    };
    ${ ({position, direction}) => 
        position === 'right' && `right: ${direction === 'row'? "5px" : "calc(50% - 9px)"}`
    };

    // ***
    display: flex;
    align-items: center;
    justify-content: center;
`
interface CarouselProps {
    children: ReactNode | ReactNode[];
    direction?: 'row' | 'column';
    enableLoop?: boolean;
    autoLoop?: boolean;
    autoTime?: number;
    transitionTime?: number;
}
const Carousel = ({
    children: propsChildren, direction = 'row', enableLoop, autoLoop, autoTime = 1500, transitionTime = 500
}: CarouselProps) => {
   
    const children = Array.isArray(propsChildren)? propsChildren : [propsChildren];
    const [ idx, setidx ] = useState(0);

    useEffect(() => {
        /*
            setInterval 콜백은 클로저로 인해 idx, onClickRight 활용 불가능
                콜백이 생성된 시점의 idx를 들고 콜백큐로 넘어감
            useState set의 prev 활용
        */
        const intv = setInterval(() => {
            if (autoLoop)
                setidx( prev => prev < children.length-1? prev+1 : enableLoop? 0 : prev);
        }, autoTime);
        return () => clearInterval(intv);
    }, [autoLoop, autoTime]);

    const onClickLeft = () => {
        if (idx) setidx(prev => prev-1);
        else if (enableLoop) setidx(children.length - 1);
    }
    const onClickRight = () => {
        if (idx < children.length-1) setidx(prev => prev+1);
        else if (idx === children.length-1 && enableLoop) setidx(0);
    }
    
    return <CarouselContainer direction={direction}>
        <CarouselButton  direction={direction} position="left" onClick={onClickLeft}>
            {direction === 'row'? "◀︎" : "▲"}
        </CarouselButton>
        {
            children.map((child, i) => <CarouselItem key={i} offset={idx}
                transitionTime={transitionTime} direction={direction}
                >{child}
            </CarouselItem>)
        }
        <CarouselButton direction={direction} position="right" onClick={onClickRight}>
            {direction === 'row'? "▶︎" : "▼"}
        </CarouselButton>
    </CarouselContainer>
}

export default Carousel;