import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import './Draggable.css';
import { debounce } from 'underscore';

function Draggable({
  children,
  handleRef,
  onMove,
  x,
  y
}) {
  const dragRef = useRef(null);
  const initialX = useRef(0);
  const initialY = useRef(0);
  const [position, setposition] = useState({
    x,
    y
  });
  const Move = useMemo(() => debounce((x, y) => onMove(x, y), 500), [onMove]);
  const onMouseMove = useCallback(e => {
    setposition({
      x: e.clientX - initialX.current,
      y: e.clientY - initialY.current
    }); // console.log(e.clientX - initialX.current, e.clientY - initialY.current);

    Move(e.clientX - initialX.current, e.clientY - initialY.current);
  }, [Move]);
  let removeEvents;
  removeEvents = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', removeEvents);
    document.body.removeEventListener('mouseleave', removeEvents);
  }, [onMouseMove, removeEvents]);
  const onMouseDown = useCallback(e => {
    const {
      left,
      top
    } = dragRef.current.getBoundingClientRect();
    initialX.current = e.clientX - left;
    initialY.current = e.clientY - top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', removeEvents);
    document.body.addEventListener('mouseleave', removeEvents);
  }, []);
  useEffect(() => {
    const handle = handleRef.current;
    handle.addEventListener('mousedown', onMouseDown);
    return () => {
      handle.removeEventListener('mousedown', onMouseDown);
      Move.cancel();
    };
  }, [handleRef, onMouseDown, Move]);
  return /*#__PURE__*/React.createElement("div", {
    className: "draggable",
    ref: dragRef,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`
    }
  }, children);
}

export default Draggable;