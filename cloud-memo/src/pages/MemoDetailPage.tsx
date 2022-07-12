import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";
import Box from "../components/Box";
import Flex from "../components/Flex";
import Memo from "../interfaces/Memo";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai"
import { GoTrashcan } from 'react-icons/go'

const MemoDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ memo, setMemo ] = useState<Memo | null>(null)
    
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/${id}`);
            setMemo(data)
        })()
    }, [])

    if (memo === null)
        return <Oval color="#61dbfb" secondaryColor="#61dbfb" strokeWidth="3" />

    return <Box p="16px">
        <Button onClick={() => navigate("/")}>
            <IoHome />
        </Button>
        <Flex
            key={memo.idx}
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
        <Flex justifyContent="flex-end">
            <Button onClick={() => navigate(`/${memo.idx}/edit`)}>
                <AiOutlineEdit />
            </Button>
            <Button onClick={() => {
                if (window.confirm("정말 삭제하시겠습니까?")) 
                    (async () => {
                        try {
                            const { data } = await axios.delete(`/${memo.idx}`);
                            alert("삭제 성공");
                            navigate("/");
                        } catch (e) {
                            alert((e as any).response.data.msg)
                        }
                    })()
            }}>
                <GoTrashcan />
            </Button>
        </Flex>
    </Box>
}

export default MemoDetailPage;