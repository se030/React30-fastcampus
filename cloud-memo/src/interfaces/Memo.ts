interface Memo {
    idx: number;
    content: string;
    created_at: number;
    last_modified: number;
    deleted_at: number | null;
}

export default Memo;