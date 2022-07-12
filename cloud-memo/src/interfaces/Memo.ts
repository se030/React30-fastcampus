interface Memo {
    content: string;
    created_at: number;
    last_modified: number | null;
    deleted_at: number | null;
}

export default Memo;