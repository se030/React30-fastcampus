import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Memo from "../interfaces/Memo";
import { GoReply } from 'react-icons/go'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from "react-router-dom";

const MemoTrashPage = () => {
    const navigate = useNavigate();
    const [ trashList, setTrashList ] = useState<Memo[]>([])
    const loadTrashList = async () => {
        const { data } = await axios.get("/trash");
        setTrashList(data);
    }
    const handleRestore = useCallback((id) => {
        if (window.confirm("이 메모가 복원됩니다.")) {
            (async () => {
                try {
                    const { data } = await axios.put(`/trash/${id}`);
                    alert("복원 성공");
                    loadTrashList();
                } catch (e) {
                    alert((e as any).response.data.msg)
                }
            })()
        }
    }, [])

    useEffect(() => {
        loadTrashList();
    }, [])
    return <Flex p="16px" flexDirection="column">
        <Button onClick={() => navigate("/")} width="fit-content">
            <IoMdArrowBack />
        </Button>
        {
            trashList.map((memo) => <Flex
                key={memo.created_at}
                justifyContent="space-between"
                border='1px solid #cccccc'
                p="10px"
                my='8px'
            >
                    <div dangerouslySetInnerHTML={{
                    __html: memo.content as string
                    }} />
                    <Button onClick={() => handleRestore(memo.idx)}>
                        <GoReply />
                    </Button>
            </Flex>)
        }
    </Flex>
}

export default MemoTrashPage;