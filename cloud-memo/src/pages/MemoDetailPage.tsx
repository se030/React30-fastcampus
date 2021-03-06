import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";
import Box from "../components/Box";
import Flex from "../components/Flex";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { IoHome, IoShareSocialOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io"
import { GoCloudUpload, GoTrashcan } from 'react-icons/go'
import Editor from '../components/Editor';
import Memo from "../interfaces/Memo";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from "react-router";

const MemoDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ memo, setMemo ] = useState<Memo | null>(null)
    const [ content, setContent ] = useState<string>()
    const location = useLocation();
    const handleSave = () => {
        (async () => {
            try {
                const { data } = await axios.put(`/${id}`, {
                    content: content
                });
                alert("수정 성공");
                navigate("/");
            } catch (e) {
                alert(`수정 실패
                ${(e as any).response.data.msg}`)
            }
        })()
    }
    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) 
            (async () => {
                try {
                    const { data } = await axios.delete(`/${id}`);
                    alert("삭제 성공");
                    navigate("/");
                } catch (e) {
                    alert(`삭제 실패
                    ${(e as any).response.data.msg}`)
                }
            })()
    }
    const handleShare = () => {
        const data = {
            title: "Shared from CloudMemo",
            text: memo!.content,
            url: window.location.href
        }
        window.navigator.canShare && window.navigator.canShare(data)?
            window.navigator.share(data).catch(e => alert("공유가 불가능합니다."))
            : alert("공유를 지원하지 않는 브라우저입니다.")
    }
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/${id}`);
            setMemo(data)
            setContent(data.content)
        })()
    }, [])

    if (memo === null)
        return <Oval color="#61dbfb" secondaryColor="#61dbfb" strokeWidth="3" />

    return <Box p="16px">
        <Button onClick={() => navigate("/")}>
            <IoHome />
        </Button>
        <Editor value={content}
            onChange={(val) => setContent(val)}
            style={{ margin: "8px 0px 8px 0px" }}
        />
        <Box color="grey" fontSize="smaller" textAlign="right">
            created: {new Date(memo.created_at).toLocaleString()}
        </Box>
        <Box color="grey" fontSize="smaller" textAlign="right" marginBottom="8px">
            modified: {new Date(memo.last_modified).toLocaleString()}
        </Box>
        <Flex justifyContent="flex-end">
            <Button onClick={() => handleSave()} margin="5px 0px 5px 5px">
                <GoCloudUpload />
            </Button>
            <CopyToClipboard text={window.location.host + location.pathname}
                onCopy={() => alert("링크가 복사되었습니다.")}>
                <Button title={window.location.host + location.pathname} margin="5px 0px 5px 5px">
                    <IoIosLink />
                </Button>
            </CopyToClipboard>
            <Button onClick={() => handleShare()} margin="5px 0px 5px 5px">
                <IoShareSocialOutline />
            </Button>
            <Button onClick={() => handleDelete()} margin="5px 0px 5px 5px">
                <GoTrashcan />
            </Button>
        </Flex>
    </Box>
}

export default MemoDetailPage;