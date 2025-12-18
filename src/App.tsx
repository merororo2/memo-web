import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import ToastContainer from "./components/ToastContainer";

export interface MemoProps {
  title: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
}

export interface UpdateMemoProps {
  title: string;
  content: string;
  updatedAt: number;
}
export interface ToastItem {
  id: number;
  message: string;
  type: "success" | "error";
  duration?: number;
}

function App() {
  const [memos, setMemos] = useState<MemoProps[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [darkMode, setDarkMode] = useState(false); // 모드 상태

  // 모드 토글
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

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
    triggerToast("메모가 등록되었습니다 📝", "success");
  };
  const deleteMemo = (index: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    const updatedMemos = memos.filter((_, i) => i !== index);
    setMemos(updatedMemos);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
    triggerToast("메모가 삭제되었습니다 🗑️", "error");
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
    triggerToast("메모가 수정되었습니다 ✏️", "success");
  };
  const toastIdRef = React.useRef(0);
  const triggerToast = (
    message: string,
    type: "success" | "error" = "success",
    duration = 2500
  ) => {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3000);
  };
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />
      <div className="mode-toggle-container">
        <button className="mode-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "🌞 라이트 모드" : "🌙 다크 모드"}
        </button>
      </div>
      <MemoForm
        addMemo={addMemo}
        updateMemo={updateMemo}
        editMemo={editIndex !== null ? memos[editIndex] : null}
        isEdit={editIndex !== null}
      />

      <MemoList memos={memos} deleteMemo={deleteMemo} onEdit={setEditIndex} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
