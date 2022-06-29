import React, { useState } from 'react';
import styled from '@emotion/styled';
import Card from './components/Card';
import Edit from './components/Edit';
import { BsTrash } from 'react-icons/bs';
import useMemo from './store/memoStore';

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
  const { memoList, setSelectedIndex, deleteMemo, clear } = useMemo();

  const onAdd = () => {
    setSelectedIndex(undefined);
    setmode('edit')
  };
  const onClear = () => {
    setSelectedIndex(undefined);
    clear();
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
    {
      mode ==='view' &&
      <CardContainer>
        {
          memoList?.map((memo, idx) => <Card key={idx} idx={idx} title={memo.title} onClick={() => {
            setSelectedIndex(idx);
            setmode('edit'); 
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
      <Edit setMode={setmode} />
    }
    </div>
  );
}

export default App;
