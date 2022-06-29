import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from './components/Card';
import Edit from './components/Edit';
import Memo from './interfaces/Memo';
import Cookies from 'js-cookie';
import { BsTrash } from 'react-icons/bs';

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 40px;
  flex-wrap: wrap;
`
const Button = styled.div`
    width: 80px;
    height: 80px;
    margin: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background-color: #80d4ff;
    border-radius: 4px;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    :hover {
        background-color: #50c3fc;
        transform: scale(1.01);
    }
`

function App() {
  const [ mode, setmode ] = useState<'edit' | 'view'>('view');
  const [ memoList, setmemoList ] = useState<Memo[]>([]);
  const [ selectedMemoIdx, setselectedMemoIdx] = useState<number | undefined>(undefined);

  useEffect(() => {
    const memo = JSON.parse((Cookies.get("memo") ?? null)!);
    const memoList:Memo[] = memo ?? [];
    setmemoList(memoList);
  }, [ mode ]);

  const onAdd = () => {
    setselectedMemoIdx(undefined);
    setmode('edit')
  };
  const onClear = () => {
    setselectedMemoIdx(undefined);
    setmemoList([]);
    Cookies.remove("memo");
    window.location.reload();
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
    {
      mode ==='view' &&
      <CardContainer>
        {
          memoList?.map((memo, idx) => <Card key={idx} title={memo.title} onClick={() => {
            setselectedMemoIdx(idx);
            setmode('edit'); 
          }} onDelete={() => {
            const memo = JSON.parse((Cookies.get("memo") ?? null)!);
            const memoList:Memo[] = memo ?? [];
            memoList.splice(idx, 1);
            setmemoList(memoList);
            Cookies.set("memo", JSON.stringify(memoList));
          }} />)
        }
        <div>
          <Button onClick={onAdd}>+</Button>
          <Button onClick={onClear}><BsTrash /></Button>
        </div>
      </CardContainer>
    }
    {
      mode === 'edit' &&
      <Edit setMode={setmode} selectedMemoIdx={selectedMemoIdx} />
    }
    </div>
  );
}

export default App;
