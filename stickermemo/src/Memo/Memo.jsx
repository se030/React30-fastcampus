import React, { useRef, useMemo, useEffect, useLayoutEffect, useCallback } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.css";
import Draggable from '@seyoungkim/draggable';
import { debounce } from "underscore";
import { observer } from 'mobx-react';

function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
  const handleRef = useRef(null);
  const memoContainerRef = useRef(null);

  // 입력이 일어날 때마다 업데이트되기 때문에 useMemo + debounce로 처리
  const onChangeMemo = useMemo(() => debounce(e => 
    Edit(item.id, e.target.value), 500), [item.id, Edit]
  )
  const onChangeSize= useMemo(() => debounce((entry) => {
    const { width, height } = entry[0].contentRect;
    SetWidthHeight(item.id, width, height);
  }, 100), [item.id, SetWidthHeight]);
  const onChangePosition = useCallback((x, y) => SetPosition(item.id, x, y), [item.id, SetPosition]);
  const onDelete = useCallback(() => Delete(item.id), [item.id, Delete]);

  useEffect(() => {
    return () => {
      onChangeMemo.cancel();
      onChangeSize.cancel();
    }
  }, [onChangeMemo, onChangeSize]);
  useLayoutEffect(() => {
    let RO = new ResizeObserver(onChangeSize);
    RO.observe(memoContainerRef.current)
    return () => {
      RO.disconnect();
      RO = null;
    }
  })

  return (
    <Draggable handleRef={handleRef} x={item.x} y={item.y} onMove={onChangePosition}>
      <div
        className="memo-container" ref={memoContainerRef}
        style={{ width: `${item.width}px`, height: `${item.height}px` }}
      >
        <div className="menu">
          <DragHandleIcon ref={handleRef} sx={{ cursor: "move", fontSize: "25px" }} />
          <CloseIcon
            sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
            onClick={onDelete}
          />
        </div>
        <textarea
          className="memo-text-area"
          defaultValue={item.content}
          name="txt"
          placeholder="Enter memo here"
          onChange={onChangeMemo}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default observer(Memo);
