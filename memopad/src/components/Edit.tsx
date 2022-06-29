import styled from "@emotion/styled"
import Button from "./Button"
import { BiArrowBack } from "react-icons/bi"
import { BsSave } from "react-icons/bs"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Memo from '../interfaces/Memo';

const TitleInput = styled.input`

`
const ContentInput = styled.input`
    height: 360px;
`
const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`

interface EditProps {
    setMode: (mode: 'edit' | 'view') => void;
    selectedMemoIdx?: number;
}
const Edit = ({ setMode, selectedMemoIdx }: EditProps) => {
    const [ title, settitle ] = useState("");
    const [ contents, setcontents ] = useState("");

    useEffect(() => {
        // cf) selectedMemoIdx로 넣으면 0일때 false가 됨
        if (Number.isInteger(selectedMemoIdx)) {
            const memo = JSON.parse((Cookies.get("memo") ?? null)!);
            const memoList:Memo[] = memo ?? [];
            settitle(memoList[selectedMemoIdx as number].title);
            setcontents(memoList[selectedMemoIdx as number].contents);
        }
    }, [selectedMemoIdx]);

    const onSave = () => {
        if (!(title.length && contents.length)) {
            alert("Please fill in both the title and contents.");
            return;
        }
        const memo = JSON.parse((Cookies.get("memo") ?? null)!);    // !: type 보장됨을 약속
        const memoList:Memo[] = memo ?? [];
        if (Number.isInteger(selectedMemoIdx)) {
            memoList[selectedMemoIdx as number] = { title, contents };
        } else memoList.push({ title, contents });
        Cookies.set("memo", JSON.stringify(memoList))
        setMode('view');
    }

    return <EditContainer>
        <TitleInput value={title} onChange={e => settitle(e.currentTarget.value)} />
        <ContentInput value={contents} onChange={e => setcontents(e.currentTarget.value)} />
        <ButtonContainer>
            <Button onClick={() => setMode('view')}><BiArrowBack /></Button>
            <Button onClick={onSave}><BsSave /></Button>
        </ButtonContainer>
    </EditContainer>
}

export default Edit;