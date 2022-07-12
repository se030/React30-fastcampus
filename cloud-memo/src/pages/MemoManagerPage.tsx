import axios, { AxiosPromise } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Box from "../components/Box"
import Flex from "../components/Flex";
import Memo from "../interfaces/Memo";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { IoMdArrowBack } from "react-icons/io";
import { BsCheckAll } from "react-icons/bs";
import { GiMagicBroom } from 'react-icons/gi'
import { GoTrashcan } from 'react-icons/go'

const MemoManagerPage = () => {
    const navigate = useNavigate();
    const [ memoList, setMemoList ] = useState<Memo[]>([]);
    const [ selectedList, setSelectedList ] = useState<boolean[]>([]);
    const allSelected = useRef(false);
    const loadMemo = useCallback(async () => {
        const { data } = await axios.get<Memo[]>("/");
        setMemoList(data);
        setSelectedList(new Array(data.length).fill(false))
    }, []);
    const handleSelect = useCallback((idx) => {
        setSelectedList(prev => {
            const cur = [...prev]
            if (cur[idx] && allSelected.current) allSelected.current = false;
            cur[idx] = !cur[idx]
            if (cur.filter(selected => !selected).length === 0) allSelected.current = true;
            return cur
        })
    }, [setSelectedList, allSelected]);
    const handleSelectAll = () => {
        setSelectedList(prev => {
            const cur = [...prev];
            if (cur.filter(selected => !selected).length) {
                allSelected.current = true;
                return cur.fill(true);
            } else {
                allSelected.current = false;
                return cur.fill(false);
            }
        })
    }
    const handleDeleteSelected = () => {
        if (window.confirm("선택된 메모들을 삭제합니다.")) {
            if (selectedList.filter(selected => selected).length) {
                (async () => {
                    try {
                        const req: Promise<AxiosPromise>[] = [];
                        memoList.forEach((memo, idx) => {
                            if (selectedList[idx]) req.push(axios.delete(`/${memo.idx}`))
                        })
                        await Promise.all(req)
                        alert("삭제 완료")
                        loadMemo();
                    } catch (e) {
                        alert("삭제 실패")
                    }
                })()
            }
            else alert("선택된 메모가 없습니다.")
        }
    }
    const handleDeleteAll = () => {
        if (window.confirm("모든 메모를 삭제합니다.")) {
            (async () => {
                try {
                    const { data } = await axios.delete("/");
                    alert("삭제 성공")
                    setMemoList([]);
                    setSelectedList(new Array(data.length).fill(false))
                } catch (e) {
                    alert(`삭제 실패
                    ${(e as any).response.data.msg}`)
                }
            })()
        }
    }

    useEffect(() => {
        loadMemo();
    }, [])

    return <Flex p="16px" flexDirection="column">
        <Flex justifyContent="space-between">
            <Button height="fit-content" onClick={() => navigate("/")}>
                <IoMdArrowBack />
            </Button>
            <Box>
                <Button width="70px" onClick={() => handleSelectAll()}>
                    <BsCheckAll />
                    <br /><span style={{fontSize: "10px"}}>{
                        `${allSelected.current? "unselect all":"select all"}`
                    }</span>
                </Button>
                <Button width="70px" onClick={() => handleDeleteSelected()}>
                    <GoTrashcan />
                    <br /><span style={{fontSize: "10px"}}>delete selected</span>
                </Button>
                <Button width="70px" onClick={() => handleDeleteAll()}>
                    <GiMagicBroom />
                    <br /><span style={{fontSize: "10px"}}>delete all</span>
                </Button>
            </Box>
        </Flex>
        {
            memoList.map((memo, idx) => <Flex
                    key={memo.idx}
                    onClick={() => handleSelect(idx)}
                    flexDirection="column"
                    border= {`${selectedList[idx]? "2px":"1px"} solid ${selectedList[idx]? "#777":"#cccccc"}`}
                    p="10px"
                    my='8px'
                    style={{ cursor: "pointer" }}
                >
                    <Box dangerouslySetInnerHTML={{
                        __html: memo.content as string
                        }} 
                    />
                    <Box color="grey" fontSize="smaller" textAlign="right">
                        created: {new Date(memo.created_at).toLocaleString()}
                    </Box>
                    <Box color="grey" fontSize="smaller" textAlign="right">
                        modified: {new Date(memo.last_modified).toLocaleString()}
                    </Box>
                </Flex>
            )
        }
    </Flex>
}

export default MemoManagerPage;