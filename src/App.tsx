import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";

export interface MemoProps {
  title: string;
  content: string;
}

function App() {
  const [memos, setMemos] = useState<MemoProps[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedMemos = localStorage.getItem("memos");
    if (savedMemos) setMemos(JSON.parse(savedMemos));
  }, []);

  const addMemo = (newMemo: MemoProps) => {
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    alert("메모가 등록되었습니다.");
  };

  const deleteMemo = (index: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    const updatedMemos = memos.filter((_, i) => i !== index);
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    alert("메모를 삭제하였습니다.");
  };
  const updateMemo = (updatedMemo: MemoProps) => {
    if (editIndex === null) return;

    const updatedMemos = memos.map((memo, index) =>
      index === editIndex ? updatedMemo : memo
    );

    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    setEditIndex(null);

    alert("메모가 수정되었습니다.");
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
