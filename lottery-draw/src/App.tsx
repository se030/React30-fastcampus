import styled from "@emotion/styled";
import React, { useState } from 'react';
import Button from "./components/Button";
import NumBox from './components/NumBox';
import Title from './components/Title';

const NumBoxContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

function App() {

  const [ num, setnum ] = useState<
    [number, number, number, number, number, number, number]>([1, 2, 3, 4, 5, 6, 7]);
	const [randNum, setrandNum] = useState<
		[number, number, number, number, number, number] | null>(null);

  const getRank = (
    resNum: [number, number, number, number, number, number, number],
    num: [number, number, number, number, number, number]
  ) => {
    const isBonus = num.includes(resNum[6]);
    resNum.splice(6, 1)
    let matchedNum = 0;
    for (const value of num) if(resNum.includes(value)) matchedNum++;
    
    switch(matchedNum) {
      case 6:
        return "1등입니다!"
      case 5:
        return isBonus ? "2등입니다!" : "3등입니다!";
      case 4:
        return "4등입니다!"
      case 3:
        return "5등입니다!";
    }
    return "낙첨되었습니다";
  }

  return (
    <div className="App">
      <Title>
        정답 번호
      </Title>

      <NumBoxContainer>
        {
          Array(8).fill(1).map((_, idx) => {

            if (idx === 6) return <NumBox />
            if (idx === 7) idx = 6;
            
            return <NumBox num={num[idx]} setnum={(value) => {
              if (num.includes(value)) return;
              setnum(prev => {
                prev[idx] = value;
                return [...prev];
              });
            }} />
          })
        }
      </NumBoxContainer>

      <div style={{ height : 120 }} />
      <Button onClick={() => {
				const randList: number[] = []
				while (randList.length < 6) {
					const v = Math.floor((Math.random() * 45) + 1);
					if (randList.includes(v)) continue;
					randList.push(v)
				}
				setrandNum(randList as [number, number, number, number, number, number])
			}}>랜덤 번호 추첨</Button>

      {
        randNum && 
        <>
          <div style={{ height: 24 }}/>
          <Title>
						추첨 결과
					</Title>

					<NumBoxContainer>
						{
							Array(6).fill(0).map((_, idx) => <NumBox num={randNum[idx]} />)
						}
					</NumBoxContainer>

          <div style={{ height: 24 }}/>
          <Title>
            {
              getRank([...num], [...randNum])
            }
          </Title>
        </>
      }
    </div>
  );
}

export default App;
