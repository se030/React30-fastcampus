import { useEffect, useState } from "react";
import Box from "./components/Box";
import Flex from "./components/Flex";
import { TbList } from "react-icons/tb"
import { BiArrowBack, BiCheck, BiEditAlt, BiPlus } from 'react-icons/bi'
import { RiDeleteBinLine, RiCloseFill } from 'react-icons/ri'
import axios from "axios";
import Data from "./interface/Data";

axios.defaults.baseURL = "http://localhost:8080"

function App() {
  const [page, setPage] = useState<'main' | 'edit'>('main');
  const [nowData, setNowData] = useState<null | Data>(null);
  const [dataList, setDataList] = useState<null | Data[]>(null);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(false);
  const [createInp, setCreateInp] = useState<[string, string]>(["", ""]);
  const [selectedData, setSelectedData] = useState<null | string>(null);
  const [editInp, setEditInp] = useState<[string, string]>(["", ""]);

  useEffect(() => {
    if (page === "main") {
      axios.get("/random")
        .then(res => setNowData(res.data))
        .catch(() => setError("명언을 불러오지 못했습니다."))
    }
    else {
      axios.get("/")
        .then(res => setDataList(res.data))
        .catch(() => setError("명언을 불러오지 못했습니다."))
    }
  }, [page])

  const onDeleteMaxim = (idx: number, data: Data) => {
    if (window.confirm("해당 명언을 제거하시겠습니까?")) {
      axios.delete(`/${idx}`).then(({data}) => {
        if (data.rs) {
          setDataList([]) // to prevent simultaneous deletion
          alert("제거 완료")
          axios.get("/")
            .then(res => setDataList(res.data))
            .catch(() => setError("명언을 불러오지 못했습니다."))
        }
        else alert("제거 실패")
      })
    }
  }
  const onPostMaxim = () => {
    if (createInp[0].length === 0 || createInp[1].length === 0) {
      alert("명언 정보를 입력해주세요.")
      return;
    }
    axios.post("/", {
      author: createInp[0],
      message: createInp[1]
    }).then(({data}) => {
      if (data.rs) {
        alert("생성 완료")
        setCreateMode(false)
        setCreateInp(["", ""])
        axios.get("/")
          .then(res => setDataList(res.data))
          .catch(() => setError("명언을 불러오지 못했습니다."))
      }
      else alert("생성 실패")
    })
  }
  const onEditMaxim = (idx: number, data: Data) => {
    if (data.message === selectedData) {
      console.log(editInp[0], editInp[1]) 
      axios.put(`/${idx}`, {
        author: editInp[0],
        message: editInp[1]
      }).then(({data}) => {
        if (data.rs) {
          alert("수정 완료")
          setSelectedData(null)
          axios.get("/")
            .then(res => setDataList(res.data))
            .catch(() => setError("명언을 불러오지 못했습니다."))
        }
        else alert("수정 실패")
      })
    } else {
      setSelectedData(data.message)
      setEditInp([data.author, data.message])
    }
  }

  return (
    page === 'main'?
      <>
        <Flex position="fixed" right={["16px", "64px", "64px"]} top={["16px", "64px", "64px"]} >
          <Flex width="48px" height="48px" alignItems="center" justifyContent="center"
            bg="#2699fb"color="white" fontSize="30px" borderRadius="4px" onClick={() => setPage('edit')}>
            <TbList />
          </Flex>
        </Flex>
        <Flex flexDirection="column" height="100vh" alignItems="center" justifyContent="center" paddingX="32px">
          <Box fontSize="24px">
            오늘의 명언
          </Box>
          <Flex width="100%" height="160px"
            paddingX="16px" marginTop={["32px", "64px", "64px"]} marginBottom="16px"
            alignItems="center" justifyContent="center"
            fontSize="48px" border="solid 1px #707070"
            overflowX="scroll">
            {0 < error.length && error}
            <Box width="inherit" style={{ whiteSpace: "pre" }}>
              {nowData?.message}
            </Box>
          </Flex>
          <Box fontSize="24px">
            {nowData?.author}
          </Box>
        </Flex>
      </>
      : <Flex paddingTop={["16px", "64px", "64px"]} paddingLeft={["8px", "64px", "64px"]} flexDirection="column">

        <Flex style={{ gap: "44px" }} paddingBottom="44px">
          <Flex width="48px" height="48px" alignItems="center" justifyContent="center"
            bg="#2699fb"color="white" fontSize="30px" borderRadius="4px" onClick={() => {
              setPage('main')
              setCreateMode(false)
            }}>
            <BiArrowBack />
          </Flex>
          <Flex width="48px" height="48px" alignItems="center" justifyContent="center"
            bg="#2699fb"color="white" fontSize="30px" borderRadius="4px" onClick={() => setCreateMode(prev => !prev)}>
            { createMode? <RiCloseFill /> : <BiPlus /> }
          </Flex>
        </Flex>

        {
          createMode && <Flex width={["90%", "500px", "500px"]} height="48px" marginBottom="16px">
          <Flex flex="1" border="solid 1px #707070">
            <input value={createInp[0]} placeholder="author" onChange={ e => setCreateInp(prev => [e.target.value, prev[1]]) }/>
            <input value={createInp[1]} placeholder="message" style={{ flex:1 }}
              onChange={ e => setCreateInp(prev => [prev[0], e.target.value]) }/>
          </Flex>
          <Flex width="48px" height="48px" alignItems="center" justifyContent="center"
            bg="#2699fb"color="white" fontSize="30px" borderRadius="4px" onClick={() => onPostMaxim()}>
            <BiCheck />
          </Flex>
        </Flex>
        }
        {
          dataList?.map((data, idx) => <Flex key={data.message} width={["90%", "500px", "500px"]} height="48px" marginBottom="16px">
              <Flex flex="1" border="solid 1px #707070" overflowX="scroll" style={{ whiteSpace: "pre" }}>
                {
                  data.message === selectedData?
                    <>
                      <input value={editInp[0]} placeholder="author" onChange={ e => setEditInp(prev => [e.target.value, prev[1]]) }/>
                      <input value={editInp[1]} placeholder="message" style={{ flex:1 }}
                        onChange={ e => setEditInp(prev => [prev[0], e.target.value]) }/>
                    </>
                    : <>{data.author} <i>{data.message}</i></>
                }
              </Flex>
              <Flex width="48px" height="48px" alignItems="center" justifyContent="center"
                bg="#2699fb"color="white" fontSize="30px" borderRadius="4px" onClick={() => onEditMaxim(idx, data)}>
                {
                  data.message === selectedData? <BiCheck /> : <BiEditAlt />
                }
              </Flex>
              <Flex width="48px" height="48px" alignItems="center" justifyContent="center"
                bg="#ff0c0c"color="white" fontSize="30px" borderRadius="4px" onClick={() => onDeleteMaxim(idx, data)}>
                <RiDeleteBinLine />
              </Flex>
            </Flex>
          )
        }

      </Flex>
  );
}

export default App;
