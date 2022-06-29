import create from 'zustand'
import Memo from '../interfaces/Memo'

interface MemoState {
    memoList: Memo[];
    selectedIndex: number | undefined;
    addMemoList: (memo: Memo) => void;
    clear: () => void;
    setSelectedIndex: (idx: number | undefined) => void;
    editMemo: (idx: number, memo: Memo) => void;
    deleteMemo: (idx: number) => void;
}
const useMemo = create<MemoState>(set => ({
    memoList: JSON.parse(localStorage.getItem("memo.memoList") ?? "[]"),
    selectedIndex: undefined,
    addMemoList: (memo: Memo) => {
        set((prev) => {
            const memoList = [ ...prev.memoList, memo ];
            localStorage.setItem("memo.memoList", JSON.stringify(memoList));
            return { ...prev , memoList }
        })
    },
    clear: () => {
        set({
            memoList: []
        })
        localStorage.setItem("memo.memoList", "[]");
    },
    setSelectedIndex: (idx: number | undefined) => {
        set({
            selectedIndex: idx
        })
    },
    editMemo: (idx: number, memo: Memo) => {
        set((prev) => {
            prev.memoList[idx] = memo;
            localStorage.setItem("memo.memoList", JSON.stringify(prev.memoList));
            return { ...prev }
        })
    },
    deleteMemo: (idx: number) => {
        set((prev) => {
            prev.memoList.splice(idx, 1);
            localStorage.setItem("memo.memoList", JSON.stringify(prev.memoList));
            return { ...prev }
        })
    }
}))

export default useMemo;