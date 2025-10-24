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

  useEffect(() => {
    const savedMemos = localStorage.getItem("memos");
    if (savedMemos) setMemos(JSON.parse(savedMemos));
  }, []);

  const addMemo = (newMemo: MemoProps) => {
    const updatedMemos = [...memos, newMemo];
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };

  const deleteMemo = (index: number) => {
    const updatedMemos = memos.filter((_, i) => i !== index);
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
  };

  return (
    <div>
      <Header />
      <MemoForm addMemo={addMemo} />
      <MemoList memos={memos} deleteMemo={deleteMemo} />
    </div>
  );
}

export default App;
