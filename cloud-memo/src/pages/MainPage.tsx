import Memo from "../interfaces/Memo";
import Box from "../components/Box";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Editor from "../components/Editor";
import { FaCloud } from 'react-icons/fa'
import { AiOutlineSetting } from 'react-icons/ai'
import { GoCloudUpload, GoTrashcan } from 'react-icons/go'
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
    const navigate = useNavigate();
    const [ edit, setEdit ] = useState("");
    const [ memoList, setMemoList ] = useState<Memo[]>([]);

    const loadMemo = useCallback(async () => {
        const { data } = await axios.get<Memo[]>("/");
        setMemoList(data);
    }, [])
    const handleSubmit = useCallback(async () => {
        if (edit.replaceAll(/<(?!img)\/?[^<>]*>/g, "").length === 0) {
            alert("내용을 입력하세요");
            return;
        }
        try {
            const { data } = await axios.post("/", {
                content: edit
            });
            setMemoList(prev => [...prev, data]);
            setEdit("");
            alert("저장 완료");
        } catch(e) {
            alert("저장 실패");
        }
    }, [edit])

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/temp");
            setEdit(data.content);
        })()
        loadMemo();
    }, [])
    useEffect(() => {
        axios.post("/temp", {
            content: edit
        })
    }, [edit])
    
    return <Box p="16px">
        <div style={{
                position: 'sticky',
                top: '0px',
                backgroundColor: 'white',
                padding: '5px 0px',
        }}>
            <h1>
                CloudMemo<FaCloud style={{ color: "#61dbfb" }}/>
            </h1>
            <Editor value={edit} onChange={(val) => setEdit(val)} />
            <Button onClick={handleSubmit}>
                <GoCloudUpload />
            </Button>
            <Box display="inline" position="absolute" right="-5px">
                <Button onClick={() => navigate("/manager")}>
                    <AiOutlineSetting />
                </Button>
                <Button onClick={() => navigate("/trash")}>
                    <GoTrashcan />
                </Button>
            </Box>
        </div>
        {
            memoList.map((memo) => <Flex
                    key={memo.idx}
                    onClick={() => navigate(`/${memo.idx}`)}
                    flexDirection="column"
                    border='1px solid #cccccc'
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
    </Box>
}

export default MainPage;