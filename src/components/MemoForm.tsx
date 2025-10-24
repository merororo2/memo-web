import React, { useState, type FormEvent } from "react";
import "../assets/css/mainForm.css";
import type { MemoProps } from "../App";

interface MemoFormProps {
  addMemo: (memo: MemoProps) => void;
}

function MemoForm({ addMemo }: MemoFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addMemo({ title: title.trim(), content: content.trim() });

    setTitle("");
    setContent("");
  }

  return (
    <form className="memo_form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="memo_title"
        className="memo_title"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        id="memo_contents"
        className="memo_contents"
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="btns">
        <button className="submit_btn" type="submit">
          추가
        </button>
        <button
          className="reset_btn"
          type="button"
          onClick={() => {
            setTitle("");
            setContent("");
          }}
        >
          초기화
        </button>
      </div>
    </form>
  );
}

export default MemoForm;
