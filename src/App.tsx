import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";

export interface MemoProps {
  title: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
}
export type UpdateMemoProps = {
  title: string;
  content: string;
  updatedAt: number;
};
function App() {
  const [memos, setMemos] = useState<MemoProps[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedMemos = localStorage.getItem("memos");
    if (savedMemos) {
      const parsed: MemoProps[] = JSON.parse(savedMemos);

      const fixedMemos = parsed.map((memo) => ({
        ...memo,
        createdAt: memo.createdAt ?? Date.now(),
      }));

      setMemos(fixedMemos);
      localStorage.setItem("memos", JSON.stringify(fixedMemos));
    }
  }, []);
  const addMemo = (newMemo: MemoProps) => {
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };
  const deleteMemo = (index: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    const updatedMemos = memos.filter((_, i) => i !== index);
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    alert("메모를 삭제하였습니다.");
  };
  const updateMemo = (updatedMemo: UpdateMemoProps) => {
    if (editIndex === null) return;

    const updatedMemos = memos.map((memo, index) =>
      index === editIndex
        ? {
            ...memo,
            title: updatedMemo.title,
            content: updatedMemo.content,
            updatedAt: updatedMemo.updatedAt,
          }
        : memo
    );

    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    setEditIndex(null);
  };
  return (
    <div>
      <Header />
      <MemoForm
        addMemo={addMemo}
        updateMemo={updateMemo}
        editMemo={editIndex !== null ? memos[editIndex] : null}
        isEdit={editIndex !== null}
      />

      <MemoList memos={memos} deleteMemo={deleteMemo} onEdit={setEditIndex} />
    </div>
  );
}

export default App;
