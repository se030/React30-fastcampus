import { useParams } from 'react-router';
import Memo from "../interfaces/Memo";
import { useEffect, useState } from "react";
import Editor from '../components/Editor';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Box from '../components/Box';
import Button from '../components/Button';
import { GoCloudUpload } from 'react-icons/go'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from "react-router-dom";

const MemoWritePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ memo, setMemo ] = useState<string | null>(null)
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/${id}`);
            setMemo(data.content)
        })()
    }, [])

    if (memo === null)
            return <Oval color="#61dbfb" secondaryColor="#61dbfb" strokeWidth="3" />
    return <Box p="16px">
        <Button onClick={() => navigate(`/${id}`)}>
            <IoMdArrowBack />
        </Button>
        <Editor value={memo} onChange={setMemo} style={{ margin: "8px 0px 8px 0px" }} />
        <Button onClick={() => {
            try {
                (async () => {
                    const { data } = await axios.put(`/${id}`, {
                        content: memo
                    });
                    alert("수정 성공");
                    navigate(`/${id}`);
                })()
            } catch (e) {
                alert((e as any).response.data.msg);
            }
        }}>
            <GoCloudUpload />
        </Button>
    </Box>
}

export default MemoWritePage;