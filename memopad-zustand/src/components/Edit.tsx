import styled from "@emotion/styled"
import Button from "./Button"
import { BiArrowBack } from "react-icons/bi"
import { BsSave } from "react-icons/bs"
import { useEffect, useState } from "react"
import useMemo from "../store/memoStore"

const TitleInput = styled.textarea``
const ContentInput = styled.textarea`
    height: 360px;
`
const EditContainer = styled.div`
    width: 600px;
    margin: auto;
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
}
const Edit = ({ setMode }: EditProps) => {
    const [ title, settitle ] = useState("");
    const [ contents, setcontents ] = useState("");
    const { addMemoList, editMemo, memoList, selectedIndex } = useMemo();

    useEffect(() => {
        if (Number.isInteger(selectedIndex)) {
            settitle(memoList[selectedIndex as number].title);
            setcontents(memoList[selectedIndex as number].contents);
        }
    }, [selectedIndex, memoList]);

    const onSave = () => {
        if (!(title.length && contents.length)) {
            alert("Please fill in both the title and contents.");
            return;
        }
        if (Number.isInteger(selectedIndex))
            editMemo(selectedIndex!, { title, contents });
        else
            addMemoList({ title, contents });
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